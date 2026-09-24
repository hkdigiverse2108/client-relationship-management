import toast from 'react-hot-toast';

export const getInitials = (name) => {
  if (!name) return 'UN';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const exportToPDF = (title, columns, data) => {
  if (!data || data.length === 0) {
    toast.error('No data to export');
    return;
  }
  
  const printWindow = window.open('', '_blank');
  
  const thHtml = `<th style="width: 40px; text-align: center;">NO.</th>` + columns.map(col => `<th>${col.header}</th>`).join('');
  
  const trHtml = data.map((row, index) => {
    const tds = columns.map(col => {
      if (col.type === 'avatar') {
        const avatarUrl = col.getAvatar ? col.getAvatar(row) : null;
        const name = col.getName ? col.getName(row) : '';
        const sub = col.getSubText ? col.getSubText(row) : '';
        
        let avatarHtml = '';
        if (avatarUrl) {
          avatarHtml = `<img src="${avatarUrl}" alt="img" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />`;
        } else {
          avatarHtml = `<div style="width: 36px; height: 36px; background-color: #ff6a00; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold;">${getInitials(name)}</div>`;
        }
        
        return `
          <td>
            <div style="display: flex; align-items: center;">
              <div style="flex-shrink: 0; margin-right: 12px;">${avatarHtml}</div>
              <div>
                <div style="font-weight: 600; color: #333; font-size: 13px;">${name || '-'}</div>
                ${sub ? `<div style="font-size: 11px; color: #777; margin-top: 2px;">${sub}</div>` : ''}
              </div>
            </div>
          </td>
        `;
      } else {
        const val = col.selector ? col.selector(row) : '';
        return `<td class="no-wrap">${val || '-'}</td>`;
      }
    }).join('');
    
    return `<tr><td style="text-align: center; font-weight: 600; color: #777;">${index + 1}</td>${tds}</tr>`;
  }).join('');
  
  let html = `
    <html>
      <head>
        <title>${title} Export</title>
        <style>
          @page { size: landscape; margin: 15mm; }
          body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; padding: 0; margin: 0; color: #2b2b2b; }
          h2 { text-align: left; color: #ff6a00; font-weight: 800; font-size: 24px; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
          .header-line { width: 100%; height: 3px; background-color: #ff6a00; margin-bottom: 25px; border-radius: 2px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
          th, td { border-bottom: 1px solid #edf2f9; padding: 14px 16px; text-align: left; vertical-align: middle; }
          th { 
            background-color: rgba(255, 106, 0, 0.08); 
            color: #1e1e1e; 
            font-weight: 800; 
            text-transform: uppercase; 
            font-size: 11px; 
            letter-spacing: 0.5px;
            white-space: nowrap; 
            border-bottom: 2px solid rgba(255, 106, 0, 0.3);
          }
          tr:nth-child(even) { background-color: rgba(248, 249, 250, 0.7); }
          .no-wrap { white-space: nowrap; }
          td { color: #495057; }
        </style>
      </head>
      <body>
        <h2>${title}</h2>
        <div class="header-line"></div>
        <table>
          <thead>
            <tr>${thHtml}</tr>
          </thead>
          <tbody>
            ${trHtml}
          </tbody>
        </table>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          }
        </script>
      </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
};

export const exportToExcel = (fileName, columns, data) => {
  if (!data || data.length === 0) {
    toast.error('No data to export');
    return;
  }
  
  const headers = columns.map(col => col.header);
  const csvRows = [];
  csvRows.push(headers.map(h => `"${h}"`).join(','));
  
  data.forEach(row => {
    const rowData = columns.map(col => {
      let val = '';
      if (col.type === 'avatar') {
        val = col.getName ? col.getName(row) : '';
      } else {
        val = col.selector ? col.selector(row) : '';
      }
      val = (val || '').toString().replace(/"/g, '""');
      return `"${val}"`;
    });
    csvRows.push(rowData.join(','));
  });
  
  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success('Exported to Excel successfully');
};
