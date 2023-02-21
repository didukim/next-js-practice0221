import {useRouter} from 'next/router';
export default function Create() {
  const router = useRouter();
  return (
    <>
      <h2>Create</h2>
      <form onSubmit={(evt) => {
        evt.preventDefault(); // create click 해도 페이지 리로딩이 일어나지 않음
        // evt.target 은 form 태그를 가르킴
        const title = evt.target.title.value;
        const body = evt.target.body.value;
        console.log(title);
        console.log(body);

        fetch(process.env.NEXT_PUBLIC_API_URL+'topics/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: title,
            body: body
          })
        }).then(res=>res.json())
          .then(result=> {
            console.log('result', result);
            // redirect to /read/[id]
            // window.location.href = '/read'+result.id; // 이렇게는 안함 왜냐면 그러면 single page reload가 아니니까..
            router.push('/read/'+result.id) // 페이지 리로드 없이 redirect 가능함
          })

      }}>
        <p><input type="text" name="title" placeholder="title"/></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="create"/></p>
      </form>
    </>
  )
}
