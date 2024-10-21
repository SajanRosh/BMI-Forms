import React, { useState } from 'react';
import {useForm} from 'react-hook-form'

function App() {
  let [unitHeight, setUnitHeight] = useState('m');
  let [unitWeight, setUnitWeight] = useState('kg');
  let [result, setResult] = useState('');
  let [status, setStatus] = useState('')
  let {register,handleSubmit} = useForm();

  function heightHandler(){
    let heightIcon = document.getElementById('heightIcon');
     heightIcon.addEventListener('click',() =>{
    document.getElementById('heightdrp').classList.remove('hidden');
    document.getElementById('weightdrp').classList.add('hidden');
    document.getElementById('finalStatus').classList.add('hidden');
  })}
  function heightHiddenHandler(){
    document.getElementById('heightdrp').classList.add('hidden');
  }
  function weightHandler(){
    let weightIcon = document.getElementById('weightIcon');
     weightIcon.addEventListener('click',() =>{
    document.getElementById('weightdrp').classList.remove('hidden');
    document.getElementById('heightdrp').classList.add('hidden');
    document.getElementById('finalStatus').classList.add('hidden');
  })}
  function weightHiddenHandler(){
    document.getElementById('weightdrp').classList.add('hidden');
  }
  function height(event){
    if(event.target.innerText === 'centimeters (cm)'){
      setUnitHeight('cm')
    }else if (event.target.innerText === 'meters (m)'){
      setUnitHeight('m')
    }else if (event.target.innerText === 'feet (ft)'){
      setUnitHeight('ft')
    }else if (event.target.innerText === 'inches (in)'){
      setUnitHeight('in')
    }
    document.getElementById('heightdrp').classList.add('hidden')
  }
  function weight(event){
    if(event.target.innerText === 'kilograms (kg)'){
      setUnitWeight('kg')
    }else if (event.target.innerText === 'pounds (lb)'){
      setUnitWeight('lb')
    }else if (event.target.innerText === 'stones (st)'){
      setUnitWeight('st')
    }
    document.getElementById('weightdrp').classList.add('hidden');
  }
  
  function calculateHandler(data){
    
    let height = Number(data.height);
    let weight = Number(data.weight);    
    if(unitHeight === 'cm'){
      height = height / 100;
    }else if(unitHeight === 'ft'){
      height = height * 0.3048
    }else if(unitHeight === 'in'){
      height = height / 39.3700787402;
    }
    
    if(unitWeight === 'lb'){
      weight = weight / 0.45359237;
    }else if(unitHeight === 'st'){
      weight = weight * 6.35029;
    }
    setResult((weight / (height * height)).toFixed(1));
    
    if(result != 'NaN'){
      if(result < 18.5){
        setStatus('UnderWeight')
      }else if(result >= 18.5 && result <= 24.9){
        setStatus('Normal Weight')
      }else if ( result >= 25 && result <= 29.9){
        setStatus('OverWeight')
      }else if(result >= 30 && result < 35){
        setStatus('Obesity');
      }else if(result >= 35){
        setStatus('Severe Obesity');
      }
    }else{
      setResult('');
      setStatus('Provide valid data');
    }
    document.getElementById('finalStatus').classList.remove('hidden');
  }
  return (
    <div>
      <div className='mt-12 w-[400px] mx-auto'>
        <h1 className='text-2xl font-bold text-slate-500 text-center'>BMI Calculator</h1>
        <div className='w-full border bg-gray-100 mt-10'>
          <form action="" onSubmit={handleSubmit(calculateHandler)}>
            <div className='flex justify-between items-center bg-gray-300 px-4 py-4 border border-b-1'>
              <h1>Height</h1>
              <div className="flex items-center gap-3">
                <input type="number" {...register('height')} className='bg-gray-300 focus:outline-none w-[50px] focus:bg-gray-300 text-right outline-none'/>
                <div className="relative inline-block text-left" onClick={heightHandler}>
                  <div className='flex items-center gap-2 underline' >
                    <h1 className='underline text-violet-500'>{unitHeight}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" id='heightIcon' width="10" height="14" fill="rgb(0,124,178)" className="bi bi-caret-down-fill mt-2" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
                  </div>
                  <div id='heightdrp' onMouseLeave={heightHiddenHandler} className="absolute right-0 mt-4 z-10 w-56 mr-[-17px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="" role="none">
                      {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                      <p onClick={height} className="block px-4 py-2 text-sm text-gray-700 bg-neutral-200 hover:bg-neutral-400" value="cm">centimeters (cm)</p>
                      <p onClick={height} className="block px-4 py-2 text-sm text-gray-700 bg-neutral-200 hover:bg-neutral-400" role="menuitem" tabIndex="-1" id="menu-item-1" >meters (m)</p>
                      <p onClick={height} className="block px-4 py-2 text-sm text-gray-700 bg-neutral-200 hover:bg-neutral-400" role="menuitem" tabIndex="-1" id="menu-item-2" >feet (ft)</p>
                      <p onClick={height} className="block px-4 py-2 text-sm text-gray-700 bg-neutral-200 hover:bg-neutral-400" role="menuitem" tabIndex="-1" id="menu-item-2" >inches (in)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>  

            <div className='flex justify-between items-center bg-gray-300 p-4 border border-b-1'>
              <h1>Weight</h1>
              <div className="flex items-center gap-3">
              <input type="number" {...register('weight')} className='bg-gray-300 focus:outline-none w-[50px] text-right'/>
                <div className="relative inline-block text-left">
                  <div className='flex items-center gap-2' onClick={weightHandler}>
                    <h1 className='underline text-violet-500'>{unitWeight}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" id='weightIcon' width="10" height="14" fill="rgb(0,124,178)" className="bi bi-caret-down-fill mt-2" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
                  </div>
                  <div id='weightdrp' onMouseLeave={weightHiddenHandler} className="absolute right-0 mt-4 mr-[-17px] z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="" role="none">
                      {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                      <a href="#" onClick={weight} className="block px-4 py-2 text-sm text-gray-700 bg-neutral-200 hover:bg-neutral-400" >kilograms (kg)</a>
                      <a href="#" onClick={weight}  className="block px-4 py-2 text-sm text-gray-700 bg-neutral-200 hover:bg-neutral-400" >pounds (lb)</a>
                      <a href="#" onClick={weight}  className="block px-4 py-2 text-sm text-gray-700 bg-neutral-200 hover:bg-neutral-400">stones (st)</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between items-center bg-gray-300 p-4 border border-b-1'>
              <h1>BMI</h1>
              <h1>{result}</h1>
            </div>
            <input type="submit" value="Calculate" className='w-full p-4 bg-black text-white font-semibold hover:cursor-pointer'/> 
            <p id='finalStatus' className='w-full mx-auto hidden text-center p-4 bg-slate-400'>{status}</p>
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default App
