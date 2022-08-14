const orders = document.querySelectorAll('.container-orders .orders')
const openModalBtn = document.querySelector('.confirmation > button')

const minimumOrder = [...orders].map(() => null)

const enableButton = (minimumOrder, button) => !minimumOrder.includes(null) ? button.disabled = false : button.disabled = true;

const removeCSSClassFromAll = (elements, CSSclass) => elements.forEach(element => element.classList.remove(CSSclass))

const addOrder = (position, order) => minimumOrder[position] = order

const totalPrice = minimumOrder => minimumOrder.map(order => Number(order.price.split(' ')[1].replace(',', '.'))).reduce((acc, curr) => acc + curr, 0).toFixed(2)

orders.forEach((orderList, i) => {
    const orderListElements = orderList.querySelectorAll('.order')

    orderListElements.forEach(order => {
        order.addEventListener('click', e => {

            removeCSSClassFromAll([...orderListElements].filter(el => el !== order), 'active')

            const orderObject = order.classList.contains('active') 
                ? null 
                : {
                    price: order.querySelector('.price').textContent,
                    title: order.querySelector('.title').textContent
                  } 
            
            addOrder(i, orderObject)

            order.classList.toggle('active')
            enableButton(minimumOrder, openModalBtn)
        })
    })
})

const sendMsgToWhatsapp = minimumOrder => {
    
    const name = prompt("Diga seu nome:")
    const address = prompt("Diga seu endereco:")
    
    const msg = `Olá, gostaria de fazer o pedido:\n- Prato: ${minimumOrder[0].title}\n- Bebida: ${minimumOrder[1].title}\n- Sobremesa: ${minimumOrder[2].title}\nTotal: R$ ${totalPrice(minimumOrder)}\nNome: ${name}\nEndereço: ${address}`


    if(!window.open(`https://wa.me/5521974553791?text=${encodeURI(msg)}`))
        alert('Coe, teu navegador bloqueou o redirect.\nNa barra de endereço deve ter um icone com um x lá no final clica nele e permite.\nCaso não funcione no inicio da barra tem um icone tenta por lá.\nDe qualquer forma vou mandar a mensagem por aqui tb.\n' + msg)
    
}

const modal = document.querySelector('.modal')
const bgModal = document.querySelector('.bg')
const confirmationBtn = document.querySelector('.ok')
const abortBtn = modal.querySelector('.abort')

const toggleModal = (modal, minimumOrder) => {
    modal.classList.toggle('open')
    const orders = modal.querySelector('.orders')
    orders.querySelectorAll('.order').forEach((order, i) => {
        order.querySelector('span:nth-child(1)').textContent = minimumOrder[i].title
        order.querySelector('span:nth-child(2)').textContent = minimumOrder[i].price
    })

    orders.querySelector('.total span:nth-child(2)').textContent = 'R$ ' + totalPrice(minimumOrder).toString().replace('.', ',')
}

openModalBtn.addEventListener('click', e => toggleModal(modal, minimumOrder))
bgModal.addEventListener('click', e => toggleModal(modal, minimumOrder))
abortBtn.addEventListener('click', e => toggleModal(modal, minimumOrder))

confirmationBtn.addEventListener('click', e => sendMsgToWhatsapp(minimumOrder))




