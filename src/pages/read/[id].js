import { useRouter } from "next/router"
import React, {useState, useEffect} from 'react';

export async function getServerSideProps(context) {
    console.log('getServerSideProps');
    // fetch('http://localhost:9999/topics/'+router.query.id)
    //     .then(resp=>resp.json())
    //     .then(result => {
    //       console.log('result', result);
    //       setTopics(result);
    //     })
    
    // getServerSideProps 는 async 이므로 await 쓸 수 있음.
    // 그치만 router.query.id 는 router가 존재하지 않기 때문에 바꿔줘야대(위 참고 코드에서..)
    // context.params.id 로 객체 값을 주기로 약속되어있대... 외워야대나봄..
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+context.params.id);
    const result = await resp.json();
    // console.log('result', result);
    // setTopics(result);

    return {
      props: {
        topic: result,
        haha: "hoho",
      }, // will be passed to the page component as props
    }
}

export default function Home({topic, haha}) {
    // console.log('props', props);
  // http://localhost:9999/topics/id 로 접속해서
  // 데이터를 가져온다.
  // id는 어떻게 가져올까?
//   const router = useRouter(); // useRouter 훅
//   const [topic, setTopics] = useState(null);
    const [count, setCount] = useState(0);

  // router 가 undefined 면 서버로부터 fetch해서 데이터를 얻어올 수 없다 (nextjs에서)
//   useEffect(()=>{
//     console.log(1, router.query.id);
//     if(router.query.id !== undefined) {
//       console.log(2, router.query.id);
//       fetch('http://localhost:9999/topics/'+router.query.id)
//         .then(resp=>resp.json())
//         .then(result => {
//           console.log('result', result);
//           setTopics(result);
//         })
//     }
//   }, [router.query.id]); // router가 undefined가 아닐 때 useEffect를 실행하기 위해 두번째 파라미터에 router.query.id를 넣어준다.
//   console.log('topic', topic);
//   if(topic === null) {
//     return <>Loading...</>
//   }
  return (
    <>
        {/* {haha} */}
        <h2>{topic.title}</h2>
        {topic.body}

        <button onClick={() => {
            setCount(count+1);
        }}>Like({count})</button>
    </>
  )
}
