import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import {getLeilao, getLances, createLance} from '@/http'
import flushPromises from 'flush-promises'

//vai mockar a resolução de um compnente com valores pré definidos (const leilão)
jest.mock('@/http')
const leilao = {
    procuto: "livro",
    lanceInicial: 10,
    descricao: "something something something"
}

const lances = [
    {
        id: 1,
        valor: 1001,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1
    },
    {
        valor: 1005,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1,
        id: 2
    },
    {
        valor: 1099,
        data: '2020-06-13T18:19:44.871Z',
        leilao_id: 1,
        id: 3
    }
]

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
        await flushPromises()
        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBeTruthy()
    })
})

describe('Um leiloeiro comunica os valores de menor e maior lance', () => {
    test('Mostra o maior lance daquele leilão', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })
        await flushPromisses()
        const maiorLance = wrapper.find('.maior-lance')
        expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1099')
    })
    test('Mostra o menor lance daquele leilão', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })
        await flushPromises()
        const menorLance = wrapper.find('.menor-lance')
        expect(menorLance.element.textContent).toContain('Menor lance: R$ 1001')
    })
})