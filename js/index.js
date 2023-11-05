(function() {
console.log('test code')
  // dom elements
  const header= document.getElementById("header");
  const menu= document.getElementById("menu");
  const submenu= document.getElementById("submenu");
  const mobileMenuContainer= document.getElementById("mobileMenuContainer");
  const mobileMenu= document.getElementById("mobileMenu");
  const iconMenu= document.getElementById("iconMenu");
  const iconRole= document.getElementById("iconRole");
  const womenList= document.getElementById("womenList");
  const main= document.getElementById("main");
  const splash= document.getElementById("splash");
  
  header.style.display="none";
  submenu.style.display="none";
  hideMobileMenu();

  // Sub menu search engine

  function loadWomenList(roleArr, roleName=null) {
    let arrSize=roleArr.length
    if(arrSize>12 && !mobileMenuState){
      let result = roleArr.reduce((roleArr, item, index) => { 
        const chunkIndex = Math.floor(index/(arrSize/2))
        if(!roleArr[chunkIndex]) roleArr[chunkIndex] = [] 
        roleArr[chunkIndex].push(item)
        return roleArr
      }, [])

      womenList.innerHTML=""
      listItemFactory(result[0])
      listItemFactory(result[1])
      
    }
    else{
      womenList.innerHTML=""
      listItemFactory(roleArr, roleName)
    }
    
  }

  function listItemFactory(nameArr,roleName=null) {
    console.log("modo movil",mobileMenuState);
    if(mobileMenuState===false) {
      womenList.innerHTML+= `<ul>${nameArr.map(name => `<li>${name}</li>`).join('')}</ul>`
    }
    else {
      mobileWomenList.innerHTML= `
      <li value="closeMenu" class="role-title">${roleName} <div value="closeMenu"> X </div></li>
      ${nameArr.map(name => `<li>${name}</li>`).join('')}`;
    }
  }

  //menu movil

  let mobileMenuState= false;
  iconMenu.addEventListener("click", function() {
    mobileMenuState = true;
    if(mobileMenuState) {
      mobileMenuContainer.style.display="block"
      mobileMenuContainer.classList.add("animate__animated","animate__slideInLeft", "animate_faster")
    }
    else {
      hideMobileMenu()
    }
  })

  document.body.addEventListener("click", function(e) {
    console.log(e.target, 'body click');
    e.target.nodeName=="BODY" && hideMobileMenu();
    let roleValue= e.target.getAttribute("value");
    roleValue==="closeMenu" && backRolesMobileMenu();
  })
  
  mobileMenuContainer.addEventListener("click", function(e) {
  
    let roleName= e.target.textContent
    let mobileRole= e.target.getAttribute("value")
    if(e.target.nodeName==="IMG"){
    roleName= e.target.parentNode.textContent
     mobileRole= e.target.parentNode.getAttribute('value')
    }
      
    mobileRole==="artistasMobile" && loadWomenList(womenArray['artistas'],roleName);
    mobileRole==="arquitectasMobile" && loadWomenList(womenArray['arquitectas'],roleName);
    mobileRole==="disenadorasMobile" && loadWomenList(womenArray['disenadoras'],roleName);
    mobileRole==="escritorasMobile" && loadWomenList(womenArray['escritoras'],roleName);
    mobileRole==="fotografasMobile" && loadWomenList(womenArray['fotografas'],roleName);
    mobileRole==="maestrasMobile" && loadWomenList(womenArray['maestras'],roleName);
    console.log(e.target.nodeName);
    e.target.nodeName!=='UL' && hideMobileRolesMenu()
  })

  // muestra menu de roles movil
  function backRolesMobileMenu() {
    mobileWomenList.innerHTML=''
    mobileMenu.style.display="block"
  }

  function hideMobileRolesMenu() {
    mobileMenu.style.display="none"
  }

  function hideMobileMenu() {
    mobileMenuContainer.style.display="none"
  }

  //menu pc
  
  menu.addEventListener("mouseover",function(e) {
    console.log(e.target);
    mobileMenuState=false;
    if(e.target.nodeName=="LI") {

      let role= e.target.getAttribute("value")
      let positionX= window.scrollX + e.target.getBoundingClientRect().left
      changeSubmenuPosition(positionX, role)
      // changeIconrole(role)
      showSubmenu()

      role==='artistas' && loadWomenList(womenArray['artistas']);
      role==='arquitectas' && loadWomenList(womenArray['arquitectas']);
      role==='disenadoras' && loadWomenList(womenArray['disenadoras']);
      role==='escritoras' && loadWomenList(womenArray['escritoras']);
      role==='fotografas' && loadWomenList(womenArray['fotografas']);
      role==='maestras' && loadWomenList(womenArray['maestras']);
    } 
  });

  womenList.addEventListener("mouseleave",function(e) {
    console.log(e);
    hidesubmenu();
  });

  // function changeIconrole(icon) {
  //   iconRole.style.setProperty('--animate-duration', '3s');
  //   iconRole.setAttribute('src',`./imagenes/icon-${icon}.svg`)
  //   iconRole.classList.remove("animate__flipInY");
  //   iconRole.classList.add("animate__animated","animate__flipInY", "animate__infinite");
  // }

  function changeSubmenuPosition(pos, role) {
    // iconRole.style.position="relative";
    // iconRole.style.left= `${pos + 50}px`

    womenList.style.position="relative"
    womenList.style.left= `${pos }px`
  }

  function hidesubmenu() {
    submenu.classList.remove("animate__animated","animate__fadeIn", "animate__faster");
    submenu.style.display="none";
  }

  function showSubmenu() {
  submenu.style.display="flex";
  submenu.classList.remove(
    "animate__animated","animate__fadeOut", "animate__faster", "animate__slow"
  );
  submenu.classList.add(
    "animate__animated","animate__fadeIn", "animate_faster"
  )

  }
  
  function splashIntro() {
    header.style.display="flex"
    splash.classList.add("animate__animated", "animate__fadeOut")
    header.classList.add("animate__animated", "animate__fadeIn")
    
  }

  window.addEventListener("resize",(e)=> {
    // console.log(e);
    hideMobileMenu();
    hidesubmenu();
  })
  

  setTimeout(splashIntro, 00);
})();
