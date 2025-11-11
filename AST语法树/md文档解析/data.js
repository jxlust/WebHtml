const xxxx = {
  type: "root",
  children: [
    {
      type: "heading",
      depth: 1,
      children: [
        {
          type: "text",
          value: "文档标题",
          position: {
            start: { line: 2, column: 3, offset: 3 },
            end: { line: 2, column: 7, offset: 7 },
          },
        },
      ],
      position: {
        start: { line: 2, column: 1, offset: 1 },
        end: { line: 2, column: 7, offset: 7 },
      },
    },
    {
      type: "html",
      value: '<think data-mode="deep">\n  这是一个深度思考内容',
      position: {
        start: { line: 4, column: 1, offset: 9 },
        end: { line: 5, column: 13, offset: 46 },
      },
    },
    {
      type: "heading",
      depth: 2,
      children: [
        {
          type: "text",
          value: "思考子标题",
          position: {
            start: { line: 7, column: 6, offset: 55 },
            end: { line: 7, column: 11, offset: 60 },
          },
        },
      ],
      position: {
        start: { line: 7, column: 3, offset: 52 },
        end: { line: 7, column: 11, offset: 60 },
      },
    },
    {
      type: "list",
      ordered: false,
      start: null,
      spread: false,
      children: [
        {
          type: "listItem",
          spread: false,
          checked: null,
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  value: "要点 1",
                  position: {
                    start: { line: 8, column: 5, offset: 65 },
                    end: { line: 8, column: 9, offset: 69 },
                  },
                },
              ],
              position: {
                start: { line: 8, column: 5, offset: 65 },
                end: { line: 8, column: 9, offset: 69 },
              },
            },
          ],
          position: {
            start: { line: 8, column: 3, offset: 63 },
            end: { line: 8, column: 9, offset: 69 },
          },
        },
        {
          type: "listItem",
          spread: false,
          checked: null,
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  value: "要点 2",
                  position: {
                    start: { line: 9, column: 5, offset: 74 },
                    end: { line: 9, column: 9, offset: 78 },
                  },
                },
              ],
              position: {
                start: { line: 9, column: 5, offset: 74 },
                end: { line: 9, column: 9, offset: 78 },
              },
            },
          ],
          position: {
            start: { line: 9, column: 3, offset: 72 },
            end: { line: 9, column: 9, offset: 78 },
          },
        },
      ],
      position: {
        start: { line: 8, column: 3, offset: 63 },
        end: { line: 9, column: 9, offset: 78 },
      },
    },
    {
      type: "html",
      value: "  <div>嵌套 HTML</div>\n</think>\n后续内容",
      position: {
        start: { line: 11, column: 1, offset: 82 },
        end: { line: 13, column: 5, offset: 116 },
      },
    },
  ],
  position: {
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 14, column: 1, offset: 117 },
  },
};
