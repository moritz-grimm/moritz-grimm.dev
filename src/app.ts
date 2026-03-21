const footerText = document.getElementById("footer-text");

if (footerText) {
    footerText.innerHTML = `Copyright © 2025 - ${new Date().getFullYear()} 
                            | moritz-grimm.dev 
                            | Built by Moritz 
                            | <a href="/impressum.html">Impressum</a> 
                            | <a href="https://status.moritz-grimm.dev/status/default" target="_blank" rel="noopener noreferrer">Status</a>`;
}
