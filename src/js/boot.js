(function(window, document) {
    const cameraBtnSelector = '[data-capture-type="cam"] > [role="button"]'
    const delayAttr = 'data-response-delay-ms'
    let cameraStarted = false
    let cameraBtn = null

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (!mutation.addedNodes) return

            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    let btn = node.querySelector(cameraBtnSelector)

                    if (btn && !cameraBtn) {
                        cameraBtn = btn
                        turnOffCamera()
                    }

                    if(node.nodeName === 'VIDEO') {
                        cameraStarted = true
                        turnOffCamera()
                    }
                }
            })
        })
    })

    observer.observe(document.body, {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: true
    })

    function disconnectObserver() {
        if (!observer) return

        observer.disconnect()
    }

    function turnOffCamera() {
        if (!cameraStarted || !cameraBtn) return
        disconnectObserver()

        // unused
        let timeout = parseInt(cameraBtn.getAttribute(delayAttr), 10) / 2
        if (Number.isNaN(timeout)) {
            timeout = 1000
        }

        window.setTimeout(() => cameraBtn.click(), 1)
    }
})(window, document);
