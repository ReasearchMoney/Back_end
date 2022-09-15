# Backend API Information

---

## 로그인 API 사용 예시

### 초기 마운트 예시

```
this.$http
      .get("/api/auth/login")
      .then((res) => {
        const user = res.data.user;
        const post = res;
        if (user) {
          this.$store.commit("setUser", user);
        }
      })
      .catch((err) => {
        console.error(err);
      });
```

get api를 통해 현재 로그인 상태인지 체크.

### 아이디, 비밀번호 로그인

```
<form method="post" action="api/auth/login">
                <p class="accent--text">ID</p>
                <input type="text" name="email" v-model="email" />
                <p class="accent--text pt-5">Password</p>
                <input type="password" name="password" v-model="password" />
                <p></p>
                <button type="submit" class="accent--text">Login</button>
                <a href="/join" class="ml-3 text--text">Join</a>
              </form>
```

- post api를 통해 email(아이디), password를 백엔드로 전달
- 로그인 호출 발생시 passport isauthenticated를 통해 localstrategy에 따라 아이디와 비밀번호 체크 후 상태를 저장한다.
- 로그인 정보가 일치할 경우 redirect를 통해 페이지가 새로고침 되며, /api/auth/login get api 호출을 통해 res.data.user로 유저의 정보를 반환한다.
- user 내에 데이터가 있는지 없는지 여부에 따라 로그인 전 화면과 후 화면이 출력되도록 설정하는 것을 권장

## 이슈

`unknown database 'db이름'`

```
create database 'db이름'
```