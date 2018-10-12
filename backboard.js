loadScriptTag("https://www.gstatic.com/firebasejs/5.4.2/firebase.js", onloadFirebase);
var myDB;
var contents1 = [];
var contents2 = [];

function onloadFirebase(){
  var config = {
    apiKey: "AIzaSyB0lYGKGUoLt9kLHPsHmcQGCj-CZhtXjuA",
    authDomain: "backboard-60ff4.firebaseapp.com",
    databaseURL: "https://backboard-60ff4.firebaseio.com",
    projectId: "backboard-60ff4",
    storageBucket: "backboard-60ff4.appspot.com",
    messagingSenderId: "491458562593"
  };
  firebase.initializeApp(config);
  myDB=firebase.database();
//myDB.ref()
 //   var newwriting = {title: 'adsfasdf',
   //                  main: 'qwefwefqef',
//                     time: '2018/08/31/19/38/43'}
  //  myDB.ref('writing/'+newwriting.ti).set(newwriting);
myDB.ref('writing').once('value').then(function(snapshot){
    snapshot.forEach(function(childsnapshot){ 
        var title1 = childsnapshot.val().title;
        var title2 = childsnapshot.val().main;
        contents1.push(title1);
        contents2.push(title2);
    });
start();

})
}
function start(){
    var nowcontent=0;
var topBox2 = box().append().size('100%',50).color('PeachPuff');
var prevBox = box().appendTo(topBox2).size(40).text("<").textSize(30).border(0).click(prevPage);
for(var i=1;i<=contents1.length/10+1;i++){
    box().appendTo(topBox2).size(30).text(i).padding(2).hide().id(i).marginTop(5).click(morePage).textSize(15).border(0);
}
var nextBox = box().appendTo(topBox2).size(40).border(0).text(">").textSize(30).click(nextPage);
var nowPage = 0;
var nowBox = 1;
findBox(1).textSize(20);
selectPage();
var contentBox = box().append().size('100%',400).padding(10).color("SeaShell");
for(var i=0;i<10;i++){
    if(contents1[i+nowBox*10-10]){
    var titleBox = box().appendTo(contentBox).size("20%",'auto').text(contents1[i+nowBox*10-10])
    .marginRight(10).borderRadius(10).border(3).marginBottom(4).borderColor("#f5bba6");
    var mainBox = box().appendTo(contentBox).size("70%",'auto').text(contents2[i+nowBox*10-10])
    .border(2).borderRadius(5).borderColor("#f7cbcf");
    }
}
var bottomBox = box().append().size('100%',50).color("DarkGray");
var appendBox = box().appendTo(bottomBox).size(100,30).text('글쓰기').textSize(20).click(startappending);
var loginBox = box().appendTo(bottomBox).size(100,30).text('로그인').textSize(20).marginLeft(10).click(startlogin);
var joinBox = box().appendTo(bottomBox).size(100,30).text('회원가입').textSize(20).marginLeft(10).click(startjoin);
function selectPage(){
    for(var i=1;i<=contents1.length/10+1;i++){
        findBox(i).hide();
    }
    for(var i = nowPage*10+1;i<=nowPage*10+10;i++){
        if(findBox(i)){
        findBox(i).show();
        }
    }
}
function prevPage(){
    if(nowPage>0){
        for(var i =1;i<=contents1.length/10+1;i++){
            if(i%10==1){
        if(nowBox==i){
        nowPage--;
        selectPage();
        }
            }
        }
    }
    if(nowBox>1){  
        findBox(nowBox).textSize(15);
        nowBox--;
        findBox(nowBox).textSize(20);
    contentBox.clear();
        for(var i=0;i<10;i++){
            if(contents1[i+nowBox*10-10]){
    var titleBox = box().appendTo(contentBox).size("20%",'auto').text(contents1[i+nowBox*10-10]).borderColor("#f5bba6").marginRight(10).borderRadius(10).border(3).marginBottom(4);
    var mainBox = box().appendTo(contentBox).size("70%",'auto').text(contents2[i+nowBox*10-10]).borderColor("#f7cbcf").border(2).borderRadius(5);
            }
}
    }
    
}
function nextPage(){
    if(nowPage<2){
   for(var i =0;i<contents1.length/10+1;i++){
            if(i%10==0){
        if(nowBox==i){
        nowPage++;
        selectPage();
        }
            }
        }
    }
    if(nowBox<contents1.length/10+1&&nowBox==(contents1.length-contents1.length%10)/10){
            findBox(nowBox).textSize(15);
            nowBox++;
            findBox(nowBox).textSize(20);
    contentBox.clear();
             for(var i=0;i<10;i++){
                 if(contents1[i+nowBox*10-10]){
    var titleBox = box().appendTo(contentBox).size("20%",'auto').text(contents1[i+nowBox*10-10]).marginRight(10).borderColor("#f5bba6").borderRadius(10).border(3).marginBottom(4);
    var mainBox = box().appendTo(contentBox).size("70%",'auto').text(contents2[i+nowBox*10-10]).borderColor("#f7cbcf").border(2).borderRadius(5);
                 }
}
    }
}
function morePage(bx){
    for(var i =1;i<=contents1.length/10+1;i++){
        findBox(i).textSize(15);
    }
    bx.textSize(20);
    nowBox=bx.id();
    contentBox.clear();
       for(var i=0;i<10;i++){
                 if(contents1[i+nowBox*10-10]){
    var titleBox = box().appendTo(contentBox).size("20%",'auto').text(contents1[i+nowBox*10-10]).borderColor("#f5bba6").marginRight(10).borderRadius(10).border(3).marginBottom(4);
    var mainBox = box().appendTo(contentBox).size("70%",'auto').text(contents2[i+nowBox*10-10]).borderColor("#f7cbcf").border(2).borderRadius(5);
                 }
}
}
    var newtext = box().append().size('100%','100%').hide();
    var cancelBox = box().appendTo(newtext).size('100%',40).text('글 쓰기').textSize(20);
    var cancel = box().appendTo(cancelBox).size(80,40).text("취소").click(stopappending).float('right');
    var cancel = box().appendTo(cancelBox).size(80,40).float('left').border(0);
    var bignewtitle = box().appendTo(newtext).size('100%',30);
    box().appendTo(bignewtitle).size('20%',30).text('글 제목').marginRight('5%');
    newtitle = box().appendTo(bignewtitle).size('70%',30).editable();
    var bignewmain = box().appendTo(newtext).size('100%',"70%");
    box().appendTo(bignewmain).size('20%','100%').text('글 내용').marginRight('5%');
    newmain = box().appendTo(bignewmain).size('70%',"100%").editable();
    var edit = box().appendTo(newtext).size(80,30).text('올리기').textSize(20).marginTop(20).click(edittext);
function startappending(){
       topBox2.hide();
    contentBox.hide();
    bottomBox.hide();
    newtext.show();
}
function stopappending(){
    topBox2.show();
    contentBox.show();
    bottomBox.show();
    newtext.hide();
}
function edittext(){
    var d= new Date();
    topBox2.show();
    contentBox.show();
    bottomBox.show();
    newtext.hide();
    var newwriting = {title: newtitle.text(),
                     main: newmain.text(),
                     time: d.getFullYear()+','+(d.getMonth()+1)+','+d.getDate()+','+d.getHours()+','+d.getMinutes()+','+d.getSeconds()+','};
    myDB.ref('writing/'+newwriting.time).set(newwriting);
    myDB.ref('writing').once('value').then(function(snapshot){
    snapshot.forEach(function(childsnapshot){ 
        var title1 = childsnapshot.val().title;
        var title2 = childsnapshot.val().main;
        contents1.push(title1);
        contents2.push(title2);
    })
})
    alert('글 올리기가 완료되었습니다')
    contentBox.remove();
    topBox2.remove();
    bottomBox.remove();
    start();
}
function startlogin(){
    topBox2.hide();
    contentBox.hide();
    bottomBox.hide();
    loginmain = box().append().size('100%').color('MintCream');
    box().appendTo(loginmain).size('100%',40).text('로그인').textSize(20).padding(5);
    var bigid = box().appendTo(loginmain).size('100%',40).marginTop(80);
    box().appendTo(bigid).size(100,"100%").text("아이디",20).padding(5);
    var idBox = box().appendTo(bigid).size("70%","100%").editable().textSize(20).padding(5);
    var bigpw = box().appendTo(loginmain).size('100%',40).marginTop(10);
    box().appendTo(bigpw).size(100,"100%").text("비밀번호",20).padding(5);
    var pwBox = box().appendTo(bigpw).size("70%","100%").editable().textSize(20).padding(5);
    var loginbutton = box().appendTo(loginmain).size(150,50).text("로그인",30).padding(5).marginTop(20).click(login);
    var loginbutton = box().appendTo(loginmain).size(150,50).text("취소",30).padding(5).marginTop(20).click(cancellogin);
}
function startjoin(){
    topBox2.hide();
    contentBox.hide();
    bottomBox.hide();
    joinmain = box().append().size('100%').color('MintCream');
    box().appendTo(joinmain).size('100%',40).text('회원가입').textSize(20).padding(5);
    var bigid = box().appendTo(joinmain).size('100%',40).marginTop(80);
    box().appendTo(bigid).size(100,"100%").text("아이디",20).padding(5);
    newidBox = box().appendTo(bigid).size("70%","100%").editable().textSize(20).padding(5);
    var bigpw = box().appendTo(joinmain).size('100%',40).marginTop(10);
    box().appendTo(bigpw).size(100,"100%").text("비밀번호",20).padding(5);
    newpwBox = box().appendTo(bigpw).size("70%","100%").editable().textSize(20).padding(5);
    var bigname = box().appendTo(joinmain).size('100%',40).marginTop(10);
    box().appendTo(bigname).size(100,"100%").text("이름",20).padding(5);
    newnickBox = box().appendTo(bigname).size("70%","100%").editable().textSize(20).padding(5);
    var joinbutton = box().appendTo(joinmain).size(150,50).text("회원가입",30).padding(5).marginTop(20).click(join);
    var joinbutton = box().appendTo(joinmain).size(150,50).text("취소",30).padding(5).marginTop(20).click(cancelJoin);
}
function join(){
    localStorage.setItem("id","1234");
    
    var checkjoin=false;
    var checks=false;
    if(newidBox.text()==''||newpwBox.text()==''||newnickBox.text()==''){
        alert('값을 입력해 주세요');
        return;
    }
    myDB.ref('users').once('value').then(function(snapshot){
        snapshot.forEach(function(childsnapshot){ 
           if(childsnapshot.val()){
               
               if(childsnapshot.val().id==newidBox.text()){
                  checkjoin=true;
               }
              
           }
           
        });
         if(!checks){
               if(checkjoin){
                    alert('id가 중복됩니다\n다른 id를 입력해 주세요');
               }
               else if(!checkjoin){
                   alert('회원가입이 정상적으로 완료되었습니다');
                   checks=true;
                   cancelJoin();
                  
                   var newperson = {'id': newidBox.text(),
                         'pw': newpwBox.text(),
                         'nick': newnickBox.text()}
        myDB.ref('users/'+newperson.id).set(newperson);
               }
           }
    });
}
       
function login(){
    var checkid=false;
    var checkpw=false;
    myDB.ref('users').on('value', function(snapshot){
    var cnt = snapshot.numChildren();
        snapshot.forEach(function(childsnapshot){
                   cnt--;
           if(childsnapshot.val()){
               if(childsnapshot.val().id==idBox.text()){
                    checkid=true;
                    if(childsnapshot.val().pw==pwBox.text()){
                        checkpw=true;
                        user={'id':childsnapshot.val().id,
                              'pw':childsnapshot.val().pw,
                              'nick':childsnapshot.val().nick}
                        alert(user.nick+"님 환영합니다");
                        localStorage.setItem("id",user.id);
                    }
                    
               }
           } 
           if(cnt==0){
    if(!checkid&&!checkpw){
        alert('아이디가 일치하지 않습니다');
        idBox.text('');
    }
    if(checkid && !checkpw){
        alert('비밀번호가 일치하지 않습니다');
        pwBox.text('');
    }
    }
        });
    });
    
}
function cancelJoin(){
    topBox2.show();
    contentBox.show();
    bottomBox.show();
    joinmain.hide()
}
function cancellogin(){
    topBox2.show();
    contentBox.show();
    bottomBox.show();
    loginmain.hide()
}
}