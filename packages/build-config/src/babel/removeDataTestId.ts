import { PluginItem } from "@babel/core";

export function removeDataTestIdBabelPlugin(): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        const forbiddenProps = state.opts.props || []; // Извлечение списка запрещенных свойств из опций плагина

        // Начинается обход AST
        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;
            // Проверка, содержит ли список запрещенных свойств имя текущего узла JSX.
            if (forbiddenProps.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}
