import Avaliador from '@/views/Avaliador'
import { mount } from '@vue/test-utils'
import {getLeiloes} from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [{
    procuto: "livro",
    lanceInicial: 10,
    descricao: "something something something"
},{
    procuto: "batata",
    lanceInicial: 40,
    descricao: "something something else"
}]

describe("Avaliador que bate na API", () =>{
    test("garantir que mostra tudo retornado pela API", async ()=>{
        getLeiloes.mockResolvedValueOnce(leiloes)
        const wrapper =mount(Avaliador)
        await flushPromises()
        // conta todos elementos de uma classe
        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(leiloes.length)


    }),
    test("nada retornado pela API", async ()=>{
        getLeiloes.mockResolvedValueOnce([])
        const wrapper =mount(Avaliador)
        await flushPromises()
        // conta todos elementos de uma classe
        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(0)


    })
})