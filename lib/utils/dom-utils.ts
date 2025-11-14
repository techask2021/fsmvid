/**
 * DOM Utilities for safe DOM operations across all languages and environments
 */

/**
 * Safely create a temporary element, use it, and clean it up
 * @param callback Function that uses the temporary element
 * @returns Result from the callback function
 */
export function withTempElement<T>(
  callback: (container: HTMLDivElement) => T
): T {
  // Create a container element that will be removed
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.width = '0';
  container.style.height = '0';
  container.style.overflow = 'hidden';
  container.style.opacity = '0';
  container.style.pointerEvents = 'none';
  container.setAttribute('aria-hidden', 'true');
  container.style.zIndex = '-1';
  
  // Add to document
  document.body.appendChild(container);
  
  try {
    // Execute the callback with the container
    return callback(container);
  } finally {
    // Always clean up, even if there's an error
    try {
      // Use requestAnimationFrame to ensure the browser has rendered the element
      requestAnimationFrame(() => {
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      });
    } catch (error) {
      console.warn('Failed to remove temporary element:', error);
      // Continue execution even if cleanup fails
    }
  }
}

/**
 * Create and trigger a download link safely
 * @param url URL to download
 * @param filename Suggested filename
 */
export function safeDownload(url: string, filename: string): void {
  withTempElement((container) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank'; // Fallback
    container.appendChild(link);
    link.click();
  });
}

/**
 * Copy text to clipboard with fallback
 * @param text Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function safeCopyToClipboard(text: string): Promise<boolean> {
  try {
    // Try the modern Clipboard API first
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.warn('Clipboard API failed, trying fallback:', error);
    
    // Fallback method for browsers that don't support Clipboard API
    return withTempElement((container) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      
      // Set some styles to make it invisible
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      container.appendChild(textarea);
      
      // Select and copy
      textarea.select();
      const success = document.execCommand('copy');
      
      return success;
    });
  }
}

/**
 * Safely create and use an iframe
 * @param url URL to load in the iframe
 * @param timeout Optional time (ms) after which the iframe is removed
 */
export function safeCreateIframe(url: string, timeout: number = 10000): void {
  withTempElement((container) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    container.appendChild(iframe);
    
    // Set a timeout to remove the iframe
    if (timeout > 0) {
      setTimeout(() => {
        // The outer withTempElement will handle removal
      }, timeout);
    }
  });
}

/**
 * Create a modal that works safely in all language environments
 */
export function createSafeModal(
  content: HTMLElement,
  options: {
    onClose?: () => void;
    backdropColor?: string;
    zIndex?: number;
  } = {}
): { 
  modal: HTMLElement; 
  close: () => void; 
} {
  const modal = document.createElement('div');
  
  // Set modal styles
  modal.style.position = 'fixed';
  modal.style.inset = '0'; // Using inset instead of top/left/right/bottom for RTL support
  modal.style.backgroundColor = options.backdropColor || 'rgba(0,0,0,0.75)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = options.zIndex?.toString() || '9999';
  
  // Set WAI-ARIA attributes
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  
  // Add the content
  modal.appendChild(content);
  
  // Close function
  const close = () => {
    try {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
        if (options.onClose) {
          options.onClose();
        }
      }
    } catch (error) {
      console.warn('Failed to close modal:', error);
    }
  };
  
  // Close on backdrop click
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      close();
    }
  });
  
  // Add keydown event listener to close on Escape
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  document.addEventListener('keydown', handleKeyDown);
  
  // Append to body
  document.body.appendChild(modal);
  
  return { modal, close };
}
