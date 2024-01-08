import { Combo, connect } from '../lib'

test('combo test', () => {
    let count = 0
    let name = ''

    const c = new Combo(['1', 'toto', 'foo', '123'])
    connect(
        c,
        'changed',
        (v) => {
            count++
            name = v.name
        },
        undefined,
    )

    c.selection = 'toto'
    expect(count).toEqual(1)
    expect(name).toEqual('toto')
    expect(c.id).toEqual(1)
    expect(c.selection).toEqual('toto')

    c.selection = '123'
    expect(count).toEqual(2)
    expect(name).toEqual('123')
    expect(c.id).toEqual(3)
    expect(c.selection).toEqual('123')

    c.selection = '123'
    expect(count).toEqual(2)
    expect(name).toEqual('123')
    expect(c.id).toEqual(3)
    expect(c.selection).toEqual('123')

    c.selection = 'djsjjskj'
    expect(count).toEqual(2)
    expect(name).toEqual('123')
    expect(c.id).toEqual(3)
    expect(c.selection).toEqual('123')
})
