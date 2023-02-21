import { useRouter } from "next/router"
import React, {useState, useEffect} from 'react';

export async function getServerSideProps(context) {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+context.params.id);
    const result = await resp.json();
    return {
      props: {
        topic: result,
        haha: "hoho",
      }, // will be passed to the page component as props
    }
}

export default function Update({topic}) {
  const [title, setTitle] = useState(topic.title); // props 에서 state로 환승..
  const [body, setBody] = useState(topic.body);
  const router = useRouter();
  return (
    <>
      <h2>Update</h2>

      <form onSubmit={(evt) => {
        evt.preventDefault();
        const title = evt.target.title.value;
        const body = evt.target.body.value;
        console.log(title);
        console.log(body);

        fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+router.query.id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: title,
            body: body
          })
        }).then(res=>res.json())
          .then(result=> {
            router.push('/read/'+result.id)
          })

      }}>
        <p><input type="text" name="title" placeholder="title" value={title} onChange={(evt)=>{
            // console.log(evt.target.value);
            setTitle(evt.target.value);
        }}/></p>
        <p><textarea name="body" placeholder="body" value={body} onChange={(evt)=>{
            setBody(evt.target.value);
        }}></textarea></p>
        <p><input type="submit" value="update" /></p>
      </form>
    </>
  )
}
