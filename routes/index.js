const express=require("express")
const router = express.Router();

const getMin=(number)=>{
    let num=1;
    for(let i=1;i<number;i++){
      num= num*10;
    }
    return num;
}

const borrowing=(first=6399,sec=933)=>{
 for(let i=first.length-1;i>=0;i--){
     for(let j=sec.length-1;j>=0;j--){
         console.log(first[i],sec[j],first,sec)
         if(first[i] < sec[j]){
             return true;
         }
        }
    }
    return false;
}

const create_numbers=(minuend,subtrahend)=>{
          const x=getMin(minuend)
          const y=getMin(minuend +1)-1;
          const a=getMin(subtrahend)
          const b=getMin(subtrahend +1)-1;   
          const minuends=Math.floor(x + (y - x) * Math.random());
          const subtrahends=Math.floor(a + (b- a) * Math.random());
          return ({minuend:minuends,subtrahend:subtrahends})
}


router.post('/subtract',async(req,res)=>{

    try{
        const payload={
            questions:req.body.no_of_questions,
            minuend:req.body.minuend,
            subtrahend:req.body.subtrahend,
            borrowing:req.body?.borrowing
        }
        let result=[];
        for(let i=1;i<=payload.questions;i++){
        //get the smallest number of the given minuend  and biggest
          const get_num=await create_numbers(payload.minuend,payload.subtrahend)
          let minuend=get_num.minuend;
          let subtrahend=get_num.subtrahend;
          let check_borrowing=await borrowing(minuend.toString(),subtrahend.toString())
          if(payload.borrowing == true){
              while(check_borrowing == false){
                const get_nums=await create_numbers(payload.minuend,payload.subtrahend)
                 minuend=get_nums.minuend;
                 subtrahend=get_nums.subtrahend;
                 check_borrowing=await borrowing(minuend.toString(),subtrahend.toString())
              }
          }
          if(payload.borrowing == false){
            while(check_borrowing == true){
              const get_nums=await create_numbers(payload.minuend,payload.subtrahend)
               minuend=get_nums.minuend;
               subtrahend=get_nums.subtrahend;
               check_borrowing=await borrowing(minuend.toString(),subtrahend.toString())
            }
        }
          let correct_answer=(minuend-subtrahend);
          const options=[];
          options.push(correct_answer);
          const opt1=Math.floor(correct_answer * Math.random())
          options.push(opt1);
          const opt2=Math.floor(correct_answer * Math.random())
          options.push(opt2);
          const opt3=Math.floor(correct_answer * Math.random())
          options.push(opt3);
          let ques=`Question ${i}`
          const resp={
            [ques]:{
            minuend:minuend,
            subtrahend:subtrahend,
            correct_answer:correct_answer,
            options:options,
            check_borrowing:check_borrowing
            }
          }
          result.push(resp)
        }
        return res.status(200).json(result)
    }catch(err){
        console.log(err)
        return res.status(500).json(err.message)
    }
})


module.exports = router;

