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
    
    // 기본적으로 영어만 지원하므로 한글 폰트 문제가 있을 수 있으나, 
    // 여기서는 기본 텍스트 삽입 방식을 사용합니다.
    // (한글은 폰트 파일이 별도로 필요할 수 있음)
    doc.text(content, 10, 10);
    doc.save('document.pdf');

  } else if (format === 'word') {
    // Word 저장 (Blob 방식)
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + content.replace(/\n/g, '<br>') + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileLink = document.createElement("a");
    document.body.appendChild(fileLink);
    fileLink.href = source;
    fileLink.download = 'document.doc'; // 간단한 워드 파일 형식
    fileLink.click();
    document.body.removeChild(fileLink);
  }
});
