namespace jcast {
  export namespace http {
    export function get(url: string, callback: (data: any) => any): void {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (xhr.getResponseHeader('Content-Type')?.toLocaleLowerCase().indexOf('application/json') !== -1) {
            callback(JSON.parse(xhr.responseText));
          } else {
            callback(xhr.responseText);
          }
        }
      }

      xhr.send();
    }
  }
}
