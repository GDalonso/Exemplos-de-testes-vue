import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import {getLeilao, getLances, createLance} from '@/http'
import flushPromisses from 'flush-promises' 

//vai mockar a resolução de um compnente com valores pré definidos (const leilão)
jest.mock('@/http')
const leilao = {
    procuto: "livro",
    lanceInicial: 10,
    descricao: "something something something"
}

describe('Leiloeiro inicia um leilão sem lances', ()=>{
    test('avisa que não existem lances', async ()=>{
        // seta o componente como resolvido e o valor mockado
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce([])

        const wrapper = mount(Leiloeiro, {
            propsData:{
                id: 1
            }
        })
        
        // força a aguardar as promises serem resolvidas antes de continuar
        await flushPromisses()
        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBeTruthy()
    })
})