import {
  Packer,
  Document,
  Paragraph,
  TableRow,
  Table,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  PageBreak,
} from "docx"
import { Quiz } from "./quiz"

export async function createDocument(quiz: Quiz[][]) {
  const table = (which: "quiz" | "answer") =>
    new Table({
      borders: {
        top: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: quiz.map((q) => {
            return new TableCell({
              width: {
                size: 100 / quiz.length,
                type: WidthType.PERCENTAGE,
              },
              children: q.map(
                (qq) =>
                  new Paragraph({
                    style: "normal",
                    text: qq[which],
                  })
              ),
            })
          }),
        }),
      ],
    })

  const doc = new Document({
    title: "口算练习题",
    styles: {
      paragraphStyles: [
        {
          id: "heading",
          name: "heading",
          run: {
            font: {
              name: "黑体",
            },
            size: 36,
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
            spacing: {
              line: 400,
            },
          },
        },
        {
          id: "normal",
          name: "normal",
          run: {
            font: {
              name: "黑体",
            },
            size: 30,
          },
          paragraph: {
            spacing: {
              line: 360,
            },
          },
        },
      ],
    },
    sections: [
      {
        children: [
          new Paragraph({
            text: "口算题练习题",
            style: "heading",
          }),
          table("quiz"),
          new Paragraph({
            children: [new PageBreak()],
          }),
          new Paragraph({
            text: "答案",
            style: "heading",
          }),
          table("answer"),
        ],
      },
    ],
  })
  const content = await Packer.toBlob(doc)
  return await content.arrayBuffer()
}
