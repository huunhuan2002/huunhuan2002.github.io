const onTabChange = (e) => {
    const panelContentId = e.target.getAttribute('aria-controls')
    const panel = document.querySelectorAll('div[role="tabpanel"]')
    panel.forEach(el => {
        const id = el.getAttribute('id')
        if (id === panelContentId) {
            el.style.removeProperty('display')
            document.querySelector(`div[aria-controls=${id}]`).classList.add('is-active')
        } else {
            el.style.display = 'none'
            document.querySelector(`div[aria-controls=${id}]`).classList.remove('is-active')
        }
    })
}

const login = type => e => {
    const formOtp = document.getElementById('form_otp')
    const formEp = document.getElementById('form_ep')
    switch (type) {
        case 'o365':
            console.log(e)
            break;
        case 'ep':
            formOtp.classList.add('hide')
            formEp.classList.remove('hide')
            break;
        case 'otp':
            formOtp.classList.remove('hide')
            formEp.classList.add('hide')
            break;
        default:
            break;
    }
}

document.body.onload = () => {
    document.querySelectorAll('div[role="tab"]').forEach(el =>{
        el.onclick = onTabChange
    })

    document.getElementById('o365').onclick = login('0365')
    document.getElementById('ep').onclick = login('ep')
    document.getElementById('otp').onclick = login('otp')
}