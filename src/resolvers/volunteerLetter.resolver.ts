// eslint-disable-next-line import/no-named-as-default
import jsPDF from "jspdf";
import * as yup from "yup";

export const volunteerLetterSchema = yup.object().shape({
  message: yup
    .string()
    .required("Message is required.")
    .test({
      name: "messageSize",
      message:
        "Message exceeds the maximum character limit or does not fit within the width.",
      test: (value) => {
        const maxCharLimit = 1000;
        const trimmedValue = value.trim();
        if (trimmedValue.length > maxCharLimit) {
          return false;
        }

        const dummyDoc = new jsPDF();
        dummyDoc.setFontSize(20);
        const margin = 10;
        const lineHeight = 10;
        const maxWidth = dummyDoc.internal.pageSize.width - 2 * margin;

        dummyDoc.text(`Dear Student,`, margin, lineHeight);
        const lines = dummyDoc.splitTextToSize(trimmedValue, maxWidth);

        const totalHeight = lines.length * lineHeight + 40 + 50 + 60;

        const maxHeight = 310;

        return totalHeight <= maxHeight;
      },
    }),
});
