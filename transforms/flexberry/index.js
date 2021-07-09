const { getParser } = require('codemod-cli').jscodeshift;
const mappings = require('../../mapping');

const OPTS = {
  quote: 'single',
};

function transformer(file, api) {
  let { source } = file;
  const j = getParser(api);
  let root = j(source);

  /**
   * Find import declaration
   * @param {string|null} name
   * @param {string} source
   * @param {Collection} node
   * @returns {Collection}
   */
  const findImportDec = function (name, source, node = root) {
    const filter = {
      source: {
        value: source,
      },
    };

    let result = node.find(j.ImportDeclaration, filter);
    if (name) {
      result = result.find(j.ImportSpecifier, {
        imported: {
          name,
        },
      });
    }

    return result;
  };

  /**
   * Add Node to root
   * @param {Node} node
   * @returns {void}
   */
  const putInBody = function (node) {
    const lastImport = root.find(j.ImportDeclaration).at(-1);
    if (node.type === j.ImportDeclaration.name) {
      const firstSpecifier = node.specifiers[0];
      const isDefault = firstSpecifier.type === j.ImportDefaultSpecifier.name;

      const existImport = findImportDec(null, node.source.value);
      if (isDefault && existImport.size() > 0) {
        return;
      } else {
        const existSameSpecifier = existImport.some((i) =>
          i.node.specifiers.some(
            (s) => s.imported && s.imported.name === firstSpecifier.imported.name
          )
        );

        // Add to exist import
        if (existImport.size() > 0 && !existSameSpecifier) {
          const imp = existImport.nodes()[0];
          imp.specifiers.push(j.importSpecifier(j.identifier(firstSpecifier.imported.name)));
          return;
        }
      }
    }

    if (lastImport.size() !== 0) {
      lastImport.insertAfter(node);
    } else {
      root.find(j.Program).get('body').unshift(node);
    }
  };

  /**
   * Add import declaration to root
   * @param {string} name import specifier
   * @param {string} source import source
   * @param {boolean} def is default import specifier
   */
  const addImport = function (name, source, def) {
    const newImport = buildImportDec(name, source, def);
    putInBody(newImport);
  };

  /**
   * Build import declaration
   * @param {string} name import specifier
   * @param {string} source import source
   * @param {boolean} def is default import specifier
   * @returns {Node}
   */
  const buildImportDec = function (name, source, def = true) {
    const importSpec = def ? j.importDefaultSpecifier : j.importSpecifier;
    return j.importDeclaration([importSpec(j.identifier(name))], j.stringLiteral(source));
  };

  /**
   * Builde variable declaration
   * @param {string} identifier
   * @param {string[]} declarations
   * @param {string|null} kind default const
   * @returns {Node}
   */
  const buildDeclaration = function (identifier, declarations, kind = 'const') {
    const declarator = j.variableDeclarator(
      j.objectPattern(declarations),
      j.identifier(identifier)
    );
    return j.variableDeclaration(kind, [declarator]);
  };

  /**
   * Add declaration to root
   * @param {string} name
   * @param {string[]} props
   */
  const addDeclaration = function (name, props) {
    const declarator = buildDeclaration(name, props);
    putInBody(declarator);
  };

  let deleteNodes = [];

  /**
   * Main modifications
   */
  mappings.forEach((m) => {
    deleteNodes.push(...findImportDec(m.global, m.source).paths());

    /**
     * MemberExpressions
     */
    m.locals.forEach((replace, name) => {
      root
        .find(j.MemberExpression)
        .filter(
          (me) =>
            me.node.property.name === name && me.node.object && me.node.object.name === m.global
        )
        .replaceWith(() => {
          const newName = replace.rename ? replace.rename : name;
          const existImport = findImportDec(newName, replace.source).size() > 0;
          if (!existImport) {
            addImport(newName, replace.source, !replace.local);
          }

          return j.identifier(newName);
        });
    });

    /**
     * VariableDeclarators
     */
    const declarations = root.find(j.VariableDeclarator, {
      init: {
        name: m.global,
      },
    });

    declarations.forEach((nodePath) => {
      const props = nodePath.node.id.properties;

      props.forEach((prop) => {
        const { name } = prop.key;
        const mapping = m.locals.get(name);
        const newName = mapping.rename ? mapping.rename : name;
        const hasImport = findImportDec(newName).size() > 0;
        if (prop.value.type === 'ObjectPattern' && !hasImport) {
          addImport(newName, mapping.source, !mapping.local);
          addDeclaration(newName, prop.value.properties);
        } else if (m.locals.has(name)) {
          if (newName !== name) {
            root.find(j.Identifier, { name }).replaceWith(() => j.identifier(newName));
          }

          addImport(newName, mapping.source, !mapping.local);
        }
      });
    });

    deleteNodes.push(...declarations.paths());

    /**
     * CallExpressions
     */
    root
      .find(j.CallExpression, {
        callee: {
          object: {
            name: m.global,
          },
        },
      })
      .replaceWith((n) => {
        const { node } = n;

        return j.callExpression(j.identifier(node.callee.property.name), node.arguments);
      });
  });

  /**
   * Clean unused
   */
  const identifiers = root.find(j.Identifier);
  const uniqF = (elem, pos, arr) => arr.indexOf(elem) == pos;
  let notUses = root
    .find(j.ImportDefaultSpecifier)
    .filter((ids) => {
      let uses = identifiers
        .paths()
        .filter((i) => i.node !== ids.node.local)
        .map((i) => i.node.name)
        .filter(uniqF);

      return !uses.some((u) => u === ids.node.local.name);
    })
    .map((n) => n.parent);

  deleteNodes.push(...notUses.paths());
  deleteNodes.forEach((n) => n.prune());

  // Imports with no specifiers
  root.find(j.ImportDeclaration).forEach((i) => {
    if (i.node.specifiers.length === 0) {
      i.prune();
    }
  });

  // jscodeshift is not so great about giving us control over the resulting whitespace.
  // We'll use a regular expression to try to improve the situation (courtesy of @rwjblue).
  const lineTerminator = file.source.indexOf('\r\n') > -1 ? '\r\n' : '\n';

  source = root.toSource(Object.assign({}, OPTS, { lineTerminator }));

  return source;
}

module.exports.type = 'js';
module.exports = transformer;
