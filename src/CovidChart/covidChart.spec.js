import {mount,shallow} from 'enzyme'
import CovidChart from './covidChart'

describe('covidChart',()=>{
  let testData=[{
      'name':'city',
      'active':2000,
      'confirmed':3000
  }]
  const testDrawChart=jest.fn()
  let wrapper
  beforeEach( function(){
     wrapper=shallow(<CovidChart data={testData} drawChart={testDrawChart}></CovidChart>)
  })
  it('renders properly',()=>{
       expect(wrapper.find('#chart').length).toEqual(1)
  })

//   it('calls drawChartFunction',()=>{
//       expect(testDrawChart).toHaveBeenCallled()
//   })
})