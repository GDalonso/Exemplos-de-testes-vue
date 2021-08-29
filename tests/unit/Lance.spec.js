import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

test('não aceita lance com valor menor do que 0', () => {
    //monta o componente para teste
    const wrapper = mount(Lance)
    // acha o componente pela tag
    const input = wrapper.find('input')
    // seta um valor inválido no componente
    input.setValue(-1)
    //em src.components.Lance vemos o comportamento esperado
    //na parte de Methods o método dar lance emite um evento novo-lance
    // se o lance for válido
    // pegamos todos os eventos de novo-lance pelo wrapper
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // enviamos o formulário e vemos se criou o evento que 
    //não deveria ter sido criado
    expect(lancesEmitidos).toBeUndefined()
})



test('Emite o lance qnd o valor é válido (>0)', () => {
    //monta o componente para teste
    const wrapper = mount(Lance)
    // acha o componente pela tag
    const input = wrapper.find('input')
    // seta um valor válido no componente
    input.setValue(10)
    //em src.components.Lance vemos o comportamento esperado
    //na parte de Methods o método dar lance emite um evento novo-lance
    // se o lance for válido
    // pegamos todos os eventos de novo-lance pelo wrapper
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // enviamos o formulário e vemos se criou o evento
    //Deve criar apenas um evento por submit
    expect(lancesEmitidos).toHaveLength(1)
})

test('Emite o valor esperado em um lance válido', () =>{
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(11)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    // testa se o valor do evento é igual ao do input
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(11)
})