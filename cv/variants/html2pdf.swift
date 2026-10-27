// Export a CV HTML file to an A4 PDF with WebKit, for Macs without Chrome.
// Usage: swift html2pdf.swift <input.html> <output.pdf>
import AppKit
import WebKit

final class Exporter: NSObject, WKNavigationDelegate {
    let input: URL
    let output: URL
    let webView: WKWebView
    let window: NSWindow

    init(input: URL, output: URL) {
        self.input = input
        self.output = output
        // A4 width at 72 dpi; the window only hosts the view, it is never shown.
        let frame = NSRect(x: 0, y: 0, width: 595, height: 842)
        webView = WKWebView(frame: frame)
        window = NSWindow(contentRect: frame, styleMask: [.borderless], backing: .buffered, defer: false)
        super.init()
        window.contentView = webView
        webView.navigationDelegate = self
        webView.loadFileURL(input, allowingReadAccessTo: input.deletingLastPathComponent())
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        let mm = 72.0 / 25.4
        let info = NSPrintInfo()
        info.paperSize = NSSize(width: 210 * mm, height: 297 * mm)
        // Same margins as @page in cv.css (13mm top/bottom, 14mm sides).
        info.topMargin = 13 * mm
        info.bottomMargin = 13 * mm
        info.leftMargin = 14 * mm
        info.rightMargin = 14 * mm
        info.horizontalPagination = .fit
        info.verticalPagination = .automatic
        info.isHorizontallyCentered = false
        info.isVerticallyCentered = false
        info.jobDisposition = .save
        info.dictionary()[NSPrintInfo.AttributeKey.jobSavingURL] = output

        let op = webView.printOperation(with: info)
        op.showsPrintPanel = false
        op.showsProgressPanel = false
        op.view?.frame = webView.bounds
        op.runModal(for: window, delegate: self, didRun: #selector(done(_:success:contextInfo:)), contextInfo: nil)
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        FileHandle.standardError.write("load failed: \(error)\n".data(using: .utf8)!)
        exit(1)
    }

    @objc func done(_ op: NSPrintOperation, success: Bool, contextInfo: UnsafeMutableRawPointer?) {
        print(success ? "wrote \(output.path)" : "print failed")
        exit(success ? 0 : 1)
    }
}

let args = CommandLine.arguments
guard args.count == 3 else {
    print("usage: swift html2pdf.swift <input.html> <output.pdf>")
    exit(2)
}
let app = NSApplication.shared
app.setActivationPolicy(.prohibited)
let exporter = Exporter(
    input: URL(fileURLWithPath: args[1]).standardizedFileURL,
    output: URL(fileURLWithPath: args[2]).standardizedFileURL
)
app.run()
