import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import { Container, Grid, Button, Box, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Layout({children}) {
    const [topics, setTopics] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const router = useRouter();
    console.log('router', router);
    useEffect(() => {
      fetch(process.env.NEXT_PUBLIC_API_URL+'topics')
      .then(res => res.json())
      .then(result => {
        setTopics(result);
      })
    }, [router.asPath])
    
    // react 특성
    // const lis = [
    //   <li><Link href="/read/1">html</Link></li>,
    //   <li><Link href="/read/2">css</Link></li>
    // ]
    // for 문으로 list 만들기
    // const lis = [];
    // for(let i=0; i<topics.length; i++) {
    //    lis.push(<li key={topics[i].id}>{topics[i].title}</li>);
    // }
    // callback 함수 파라미터 한개면 괄호 생략 가능, return 한줄이면 중괄호, return 생략 가능
    // const lis = topics.map((e) => {
    //     return <li key={e.id}>{e.title}</li>
    // });
    // 위의 코드 간결하게 하기
    // const lis = topics.map(e => <li key={e.id}>{e.title}</li>);

    return <Container maxWidth="sm">
    <h1>
      <Link href="/">WEB</Link>
    </h1>
    <Grid container>
      <Grid item xs={12} sm={3} md={5}>
        <ol>
        {/* {lis} */}
        {topics.map(e => <li key={e.id}>
            <Link href={"/read/"+e.id}>{e.title}</Link>
        </li>)}
        </ol>
      </Grid>
      <Grid item xs={12} sm={9} md={7}>
        <article>
        {/* 검색 : <input type="text"/> */}
          {children}
        </article>
        <Box sx={{
            mt:1
        }}>
          <Button variant="contained" components={Link} href="/create" sx={{
            mr: 1
          }}>Create</Button>
          { router.query.id === undefined ? null : <><Button variant="contained" components={Link} href={"/update/"+router.query.id} sx={{
            mr: 1
          }}>Update</Button>
          <Button variant="contained" onClick={()=>{
            setOpenDelete(true);
          }}>Delete</Button></>}
        {/* <li><Link href="/create">Create</Link></li>
        <li><Link href="/update">Update</Link></li>
        <li><Link href="/delete">Delete</Link></li> */}
        </Box>
      </Grid>
    </Grid>
    <Dialog open={openDelete} onClose={()=>{
      setOpenDelete(false);
    }}>
      <DialogTitle id="alert-dialog-title">
        Really?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          한번 삭제는 영원한 삭제
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{setOpenDelete(false)}}>취소</Button>
        <Button autoFocus onClick={() => {
          fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+router.query.id, {
            method: 'DELETE'
          })
          .then(res=>res.json())
          .then(result=>{
            router.push('/');
            setOpenDelete(false);
          })
        }}>
          진짜삭제
        </Button>
      </DialogActions>
    </Dialog>
  </Container>
}

function Layout3() {
    return <>Layout3</>
}

export function Layout2() {
    return <>Layout2</>
}