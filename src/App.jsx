import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [question,setQuestion]=useState(null)
  const [currentindex,setCurrentIndex]=useState(0)
  const [options,setOptions]=useState()
  
useEffect(()=>{
  axios('https://the-trivia-api.com/v2/questions')
  .then((res)=>{
    console.log(res.data);
    setQuestion(res.data)
     res
  })
  .catch((err)=>{
    console.log(err);
  })
},[])

const NextQuestion=()=>{
  if (currentindex <=question.length -1) {
    setCurrentIndex(currentindex +1)
  }
  

}

const shuffle_Array=(arr)=>{
  const emptyArr=[]
  const shuffle_Array=[]
  for(let i=0; i<arr.length; i++) {
    const randomNumber=Math.floor(Math.random()*arr.length);
  }
}

return (
    <>
     <h1>Quiz App</h1>
     {
      question ? <div>
        <div>
     <h2>{currentindex +1}){question[currentindex].question.text}</h2>
     {question[currentindex].incorrectAnswers.map((item,index)=>{
      return(<div key={`option${index}`}>
        <input type="radio" name={`question${currentindex}`} id={index}value={item} />
        <label htmlFor={index}>{item}</label>
        </div>)
      
    })     }
    <div className='option'>
    <input type="radio" name={`question${currentindex}`} id={question}value={question[currentindex].correctAnswer
} />
    <label htmlFor={question}>{question[currentindex].correctAnswer}</label>
    </div>

{currentindex < question.length -1 ? <button onClick={NextQuestion}>Next</button>
       :
       <button>End Result </button>}
        </div>
        </div>

  : <h3>Loading...</h3>     }
    </>
  )
}

export default App
