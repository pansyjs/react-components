const headElement = document.head || document.getElementsByTagName('head')[0];
const _importedScript: { [src: string]: true } = {};

/**
 * load dependency by script tag
 */
export function requireScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (src in _importedScript) {
      resolve();
      return
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = '__react_amap'
    script.src = src;
    script.onerror = () => {
      headElement.removeChild(script);
      reject(new URIError(`The Script ${src} is no accessible.`));
    }
    script.onload = () => {
      _importedScript[src] = true;
      resolve();
    }
    headElement.appendChild(script);
  })
}
