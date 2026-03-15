document.getElementById('saveBtn').addEventListener('click', async () => {
  const content = document.getElementById('content').value;
  const format = document.getElementById('format').value;

  if (!content.trim()) {
    alert('내용을 입력해 주세요.');
    return;
  }

  if (format === 'pdf') {
    // PDF 저장
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save('document.pdf');

  } else if (format === 'word') {
    // Word 저장 (Blob 방식)
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + content.replace(/\n/g, '<br>') + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileLink = document.createElement("a");
    document.body.appendChild(fileLink);
    fileLink.href = source;
    fileLink.download = 'document.doc';
    fileLink.click();
    document.body.removeChild(fileLink);
  }
});
