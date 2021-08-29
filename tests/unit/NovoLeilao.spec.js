import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import {createLeilao} from '@/http'

//vai mockar a resolução de um compnente com valores pré definidos (const leilão)
jest.mock('@/http')
const leilao = {
    procuto: "livro",
    lanceInicial: 10,
    descricao: "something something something"
}

//Dá um wan d no console pq o código tenta fazer um push pra /
// [Vue warn]: Error in v-on handler (Promise/async): "TypeError: Cannot read property 'push' of undefined"
//falhava em versões antigas da library, hoje passa com warn
describe("novo leilão deve ser criado", ()=> {
    test('Dados preenchidos corretamente deve criar o leilao', ()=> {
        createLeilao.mockResolvedValueOnce(leilao)

        const wrapper = mount(NovoLeilao)

        //preenche o formulário de cadastro de leilão
        wrapper.find('.produto').setValue("nome produto")
        wrapper.find('.descricao').setValue("badaras")
        wrapper.find('.valor').setValue(90)
        wrapper.find('form').trigger('submit')

        expect(createLeilao).toHaveBeenCalled()
    })
})