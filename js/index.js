$(function () {
  /*************************************************/

  // 스크롤시 한칸 씩 이동
  var elm = ".scrollMove";
  $(elm).each(function (index) {
    // 개별적으로 Wheel 이벤트 적용
    $(this).on("mousewheel DOMMouseScroll", function (e) {
      e.preventDefault();
      var delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail) delta = -event.detail / 3;
      var moveTop = $(window).scrollTop();
      var elmSelecter = $(elm).eq(index);
      // 마우스휠을 위에서 아래로
      if (delta < 0) {
        if ($(elmSelecter).next() != $(".scrollMove").length) {
          try {
            moveTop = $(elmSelecter).next().offset().top;
          } catch (e) {}
        }
        // 마우스휠을 아래에서 위로
      } else {
        if ($(elmSelecter).prev() != undefined) {
          try {
            moveTop = $(elmSelecter).prev().offset().top;
          } catch (e) {}
        }
      }

      // 화면 이동 0.8초(800)
      $("html,body")
        .stop()
        .animate(
          {
            scrollTop: moveTop + "px",
          },
          {
            duration: 700,
            complete: function () {},
          }
        );
    });
  });

  // scroll 이벤트
  window.addEventListener("scroll", function () {
    let viewPoint = window.scrollY;
    let topOut = 100;
    let con1Top = $("#con1").offset().top - topOut,
      con2Top = $("#con2").offset().top - topOut,
      con3Top = $("#con3").offset().top - topOut,
      con4Top = $("#con4").offset().top - topOut;
      // con5Top = $("#con5").offset().top - topOut;

    /* 전체 nav 보이기 */
    if (viewPoint != 0) {
      $(".wrapNav").addClass("on");
    } else {
      $(".wrapNav").removeClass("on");
    }

    // con1에 도착시 이벤트
    if (viewPoint >= con1Top && viewPoint < con2Top) {
      // con1 클래스 관리
      $("#con1").addClass("on");
      setTimeout(function () {
        $("#con1 .imageSlide").addClass("on");
        $("#con1 .textSlide ul li").eq(currentIndex).addClass("on");
      }, 500);

      // 전체 nav 클래스 관리
      $(".wrapNav li").removeClass("on");
      $(".wrapNav li").eq(0).addClass("on");
    } else {
      // con1 클래스 관리
      $("#con1").removeClass("on");
      $("#con1 .textSlide ul li").removeClass("on");
      $("#con1 .imageSlide").removeClass("on");
    }

    // con2에 도착시 이벤트
    if (viewPoint >= con2Top && viewPoint < con3Top) {
      $("#con2").addClass("on");

      // 전체 nav 클래스 관리
      $(".wrapNav li").removeClass("on");
      $(".wrapNav li").eq(1).addClass("on");
    } else {
      $("#con2").removeClass("on");
    }

    // con3에 도착시 이벤트
    if (viewPoint >= con3Top && viewPoint < con4Top) {
      $("#con3").addClass("on");

      // 전체 nav 클래스 관리
      $(".wrapNav li").removeClass("on");
      $(".wrapNav li").eq(2).addClass("on");
    } else {
      $("#con3").removeClass("on");
    }

    // con4에 도착시 이벤트
    if (viewPoint >= con4Top) {
      $("#con4").addClass("on");

      // 전체 nav 클래스 관리
      $(".wrapNav li").removeClass("on");
      $(".wrapNav li").eq(3).addClass("on");
    } else {
      $("#con4").removeClass("on");
    }

    // con5에 도착시 이벤트
    // if (viewPoint >= con5Top) {
    //   $("#con5").addClass("on");

    //   // 전체 nav 클래스 관리
    //   $(".wrapNav li").removeClass("on");
    //   $(".wrapNav li").eq(4).addClass("on");
    // } else {
    //   $("#con5").removeClass("on");
    // }
  });

  /* visaul */
  $("#visual").addClass("on");

  /* 전체 nav */
  $(".wrapNav li").on("click", function () {
    $(".wrapNav li").removeClass("on");
    $(this).addClass("on");
  });

  /***** visual *****/
  $("#visual .logoAnimation h4").addClass("on");
  for (let i = 0; i < 7; i++) {
    $("#visual .logoAnimation span")
      .eq(i)
      .css({
        transitionDelay: i * 0.05 + "s",
      });
  }
  $("#visual .textSlide .logoAnimation .lingsAnimation .lings img").css({
    top: "-210px",
  });

  /***** con1 *****/
  // prev, next 버튼 클릭 이벤트
  let currentIndex = 0;
  let con1LastNav = $("#con1 .slideNav ul li").length - 1;

  // 버튼 이벤트
  btnEvent();
  function btnEvent() {
    if (currentIndex == 0) {
      $("#con1 .con1Btn .prev").addClass("on");
    } else {
      $("#con1 .con1Btn .prev").removeClass("on");
    }

    if (currentIndex == con1LastNav) {
      $("#con1 .con1Btn .next").addClass("on");
    } else {
      $("#con1 .con1Btn .next").removeClass("on");
    }
  }

  // con1 이전 버튼 이벤트
  $("#con1 .con1Btn .prev span").on("click", function () {
    currentIndex = currentIndex - 1;
    btnEvent();
    // con1 image slide
    $("#con1 .imageSlide ul")
      .stop()
      .animate(
        {
          left: currentIndex * -100 + "%",
        },
        500
      );

    // con1 text slide
    $("#con1 .textSlide ul")
      .stop()
      .animate(
        {
          left: currentIndex * -100 + "%",
        },
        500
      );
    $("#con1 .textSlide ul li").eq(currentIndex).addClass("on");

    // con1 slide nav
    $("#con1 .slideNav ul li").removeClass("on");
    $("#con1 .slideNav ul li").eq(currentIndex).addClass("on");
  });

  // con1 다음 버튼 이벤트
  $("#con1 .con1Btn .next span").on("click", function () {
    currentIndex = currentIndex + 1;
    btnEvent();

    // con1 image slide
    $("#con1 .imageSlide ul")
      .stop()
      .animate(
        {
          left: currentIndex * -100 + "%",
        },
        500
      );

    // con1 text slide
    $("#con1 .textSlide ul")
      .stop()
      .animate(
        {
          left: currentIndex * -100 + "%",
        },
        500
      );
    $("#con1 .textSlide ul li").eq(currentIndex).addClass("on");

    // con1 slide nav
    $("#con1 .slideNav ul li").removeClass("on");
    $("#con1 .slideNav ul li").eq(currentIndex).addClass("on");
  });

  // 년도 클릭시 슬라이드 움직임
  $("#con1 .slideNav li").on("click", function (event) {
    // a 태그 눌러도 이벤트 X
    event.preventDefault();

    // 클릭한 자릿수 저장
    currentIndex = $(this).index();

    btnEvent();
    // content 리셋후 보이는 이벤트
    $("#con1 .slideNav li").removeClass("on");
    $(this).addClass("on");
    $("#con1 .textSlide ul li").removeClass("on");
    $("#con1 .imageSlide").removeClass("on");
    $("#con1 .textSlide ul")
      .stop()
      .animate(
        {
          left: currentIndex * -100 + "%",
        },
        0,
        function () {
          $("#con1 .textSlide ul li").eq(currentIndex).addClass("on");
        }
      );
    $("#con1 .imageSlide ul")
      .stop()
      .animate(
        {
          left: currentIndex * -100 + "%",
        },
        0,
        function () {
          $("#con1 .imageSlide").addClass("on");
        }
      );
  });

  /***** con2 *****/

  // con2 일러스트 버튼
  let currentIllust = 0;
  let currentNumber = 1;
  let totalIllust = $("#con2 .nav li").length - 1; //14 출력

  setInterval(boxOn, 4500);
  // con2 일러스트 게이지
  boxOn();
  function boxOn() {
    
    // 일러스트 슬라이드
    illustSlide();

    // 슬라이드 순서
    illustNumber();

    // 게이지
    $("#con2 .box1")
      .stop()
      .animate(
        {
          left: "0%",
        },
        1000,
        function () {
          $("#con2 .box2")
            .stop()
            .animate(
              {
                top: "0%",
              },
              1000,
              function () {
                $("#con2 .box3")
                  .stop()
                  .animate(
                    {
                      left: "0%",
                    },
                    1000,
                    function () {
                      $("#con2 .box4")
                        .stop()
                        .animate(
                          {
                            top: "0%",
                          },
                          1000,
                          function gaugeRe() {
                            $("#con2 .box1").css({ left: "-100%" });
                            $("#con2 .box2").css({ top: "-100%" });
                            $("#con2 .box3").css({ left: "100%" });
                            $("#con2 .box4").css({ top: "100%" });

                            // 1씩 증가하다가 마지막일시 처음으로
                            if (currentIllust > totalIllust ) {
                              currentIllust = 0;
                            } else {
                              currentIllust++;
                              currentNumber++;
                            }
                          }
                        );
                    }
                  );
              }
            );
        }
      );

      // nav 클래스 변경
    $("#con2 .nav li").removeClass("on");
    $("#con2 .nav li").eq(currentIllust).addClass("on");
  }

  // 이전버튼
  $("#con2 .illustNav .prev").on("click", function () {
    if (currentIllust !== 0) {
      currentIllust--;
      currentNumber--;
    }
    // nav 클래스 변경
    $("#con2 .nav li").removeClass("on");
    $("#con2 .nav li").eq(currentIllust).addClass("on");

    // 일러스트 슬라이드
    illustSlide();

    // 슬라이드 순서
    illustNumber();
  });

  // 다음버튼
  $("#con2 .illustNav .next").on("click", function () {
    if (currentIllust < totalIllust) {
      currentIllust++;
      currentNumber++;
    }
    // nav 클래스 변경
    $("#con2 .nav li").removeClass("on");
    $("#con2 .nav li").eq(currentIllust).addClass("on");

    // 일러스트 슬라이드
    illustSlide();

    // 슬라이드 순서
    illustNumber();
  });

  // con2 일러스트 nav 클릭
  $("#con2 .nav li").on("click", function () {
    currentIllust = $(this).index();
    currentNumber = $(this).index() + 1;
    $("#con2 .nav li").removeClass("on");
    $(this).addClass("on");

    // 일러스트 슬라이드
    illustSlide();

    // 슬라이드 순서
    illustNumber();
  });

  // 일러스트 슬라이드
  function illustSlide() {
    if (currentIllust > totalIllust) {
      currentIllust = 0;
      $("#con2 .illustImage").css({
        left: currentIllust * -100 + "%",
      });
    } else {
      $("#con2 .illustImage")
        .stop()
        .animate(
          {
            left: currentIllust * -100 + "%",
          },
          500
        );
    }
  }

  // 일러스트 순서
  function illustNumber() {
    // 순서 숫자 변경
    if (currentNumber > totalIllust + 1) {
      currentNumber = 1;

      if (currentNumber < 10) {
        $("#con2 .currentNumber span").text("0" + currentNumber);
      } else {
        $("#con2 .currentNumber span").text(currentNumber);
      }
    } else {
      if (currentNumber < 10) {
        $("#con2 .currentNumber span").text("0" + currentNumber);
      } else {
        $("#con2 .currentNumber span").text(currentNumber);
      }
    }
  }

  /***** con3 *****/

  let con3_slideIndex = 0;
  let con3_slideTotal = $("#con3 .totalImage .product.on div").length / 4;

  let startX;
  let deltaX;
  let endX;

  // con3 슬라이드 이전 버튼 클릭 이벤트
  $("#con3 .slideWrap .slideBtn .prev").on("click", function () {
    if (con3_slideIndex > 0) {
      con3_slideIndex--;
    }
    con3_imageSlide();

    // 버튼 숨기기
    if (con3_slideIndex <= 0) {
      $(this).addClass("none");
    }
    if (con3_slideIndex > 0) {
      $("#con3 .slideWrap .slideBtn .next").removeClass("none");
    }
  });

  // con3 슬라이드 다음 버튼 클릭 이벤트
  $("#con3 .slideWrap .slideBtn .next").on("click", function () {
    if (con3_slideIndex < con3_slideTotal) {
      con3_slideIndex++;
    }
    con3_imageSlide();

    // 버튼 숨기기
    if (con3_slideIndex >= con3_slideTotal) {
      $(this).addClass("none");
    }
    if (con3_slideIndex < con3_slideTotal) {
      $("#con3 .slideWrap .slideBtn .prev").removeClass("none");
    }
  });

  // con3 이미지 슬라이드에서 마우스 눌렀을 때
  $("#con3 .slideWrap .slideImage").on("mousedown", function (e) {
    startX = e.pageX;

    $("#con3 .slideWrap .slideImage").addClass("grab");
    // 전역 변수로 선언하여 여러번 등록되지 않도록 함
    $("#con3 .slideWrap .slideImage").on("mouseup", handleMouseUp);
  });

  function handleMouseUp(e) {
    endX = e.pageX;
    deltaX = endX - startX;

    // 드래그 왼쪽
    if (deltaX < 0) {
      if (con3_slideIndex < con3_slideTotal) {
        con3_slideIndex++;
      }

      // 버튼 숨기기
      if (con3_slideIndex >= con3_slideTotal) {
        $("#con3 .slideWrap .slideBtn .next").addClass("none");
      } else if (con3_slideIndex > 0) {
        $("#con3 .slideWrap .slideBtn .prev").removeClass("none");
      }

      con3_imageSlide();
    } else {
      // 드래그 오른쪽
      if (con3_slideIndex > 0) {
        con3_slideIndex--;
      }

      // 버튼 숨기기
      if (con3_slideIndex <= 0) {
        $("#con3 .slideWrap .slideBtn .prev").addClass("none");
      } else if (con3_slideIndex < con3_slideTotal) {
        $("#con3 .slideWrap .slideBtn .next").removeClass("none");
      }
      con3_imageSlide();
    }

    
    // 등록된 이벤트 핸들러를 제거
    $("#con3 .slideWrap .slideImage").off("mouseup", handleMouseUp);
  }

  function con3_imageSlide() {
    $("#con3 .totalImage .product")
      .stop()
      .animate(
        {
          left: con3_slideIndex * -900 + "px",
        },
        500
      );
    $("#con3 .slideWrap .slideImage").removeClass("grab");
  }

  // con3 slide nav 클래스 이벤트
  $('#con3 .slideNav .nav li').on('click',function(){
    $('#con3 .slideNav .nav li').removeClass('on');
    $(this).addClass('on');
    
    let con3_currentName = $(this).attr("value")
    let con3_currentIndex = $(this).index();
    $('#con3 .title .mainText').text(con3_currentName);

    switch( con3_currentIndex){
      // 0 ~ 4
      case 0:
        $("#con3 .title .subText").text("사이클링에 적합한 클래식한 재활용 메신저백과 슬링백입니다.")
        break
      case 1:
        $("#con3 .title .subText").text("트럭 방수포, 재활용 PET 병, B-스톡 에어백으로 만든 더 작고 큰 배낭.")
        break
        case 2:
        $("#con3 .title .subText").text("손잡이가 길거나 짧은 쇼핑백과 토트백. 일부는 어깨에 걸기에 적합합니다.")
        break
      case 3:
        $("#con3 .title .subText").text("넉넉한 공간의 여행용 및 스포츠용 가방은 중고 트럭 방수포와 재활용 PET 병으로 제작되었습니다.")
        break
      case 4:
        $("#con3 .title .subText").text("숄더백은 어깨에 느슨하게 메고 다닐 수 있으며 일부는 크로스백으로도 적합합니다.")
        break

      // 5 ~ 9
      case 5:
        $("#con3 .title .subText").text("재활용된 트럭 방수포와 PET 병으로 만든 내구성이 뛰어난 패딩 처리된 노트북 가방입니다.")
        break
      case 6:
        $("#con3 .title .subText").text("재활용 트럭 방수포로 만든 지속 가능한 휴대폰 슬리브와 재활용 스키 부츠로 만든 원형 휴대폰 케이스입니다.")
        break
      case 7:
        $("#con3 .title .subText").text("패딩 처리된 안감과 패스너가 있는 재활용 트럭 방수포로 만든 노트북 및 태블릿 슬리브.")
        break
      case 8:
        $("#con3 .title .subText").text("재활용 트럭 방수포로 만든 리필 세트가 포함된 메모 및 달력 시스템.")
        break
      case 9:
        $("#con3 .title .subText").text("재활용 트럭 방수포로 만든 여행용 세면도구 및 개인 관리 가방입니다.")
        break

      // 10 ~ 11
      case 10:
        $("#con3 .title .subText").text("재활용 트럭 방수포로 만든 지갑과 카드 홀더입니다.")
        break
      case 11:
        $("#con3 .title .subText").text("만일을 대비해 다양한 크기의 가방을 재활용 트럭 방수포로 제작했습니다.")
        break
    }

    
  })

  /***** con4 *****/
  let current_circular = 0;

  $("#con4 .circular_nav .nav li").on("click",function(){
    
    clearInterval(con4_intervalId);

    // 현재 자릿수 저장
    current_circular = $(this).index();

    // 변화 움직임
    $("#con4 .circular_con figure").removeClass("on");
    setTimeout(function(){
      $("#con4 .circular_con figure").addClass("on");
    },100);
    // nav 변경
    $("#con4 .circular_nav .nav li a").removeClass("on");
    $(this).children("a").addClass("on");
    
    // 제목 변경
    let con4_title = $(this).attr("value");
    $("#con4 .circular_con h3").text(con4_title);

    // 이미지 변경
    $("#con4 .circular_con img").attr("src", "img/circular_0" + (current_circular + 1) + ".jpg")

    // 텍스트 변경
    con4_text()

    // 자동 슬라이드
    con4_intervalId = setInterval(con4_con,3000);
  })


  // 자동 슬라이드
  let con4_intervalId = setInterval(con4_con,3000);
 
  function con4_con(){
    let total_circular = $("#con4 .circular_nav li").length - 1;

    if(current_circular >= total_circular){
      current_circular = 0;
    }else{
      current_circular++;
    }

    // 변화 움직임
    $("#con4 .circular_con figure").removeClass("on");
    setTimeout(function(){
      $("#con4 .circular_con figure").addClass("on");
    },100);
    
    // nav 변경
    $("#con4 .circular_nav .nav li a").removeClass("on");
    $("#con4 .circular_nav .nav li a").eq(current_circular).addClass("on");
    
    // 제목 변경
    let con4_title = $("#con4 .circular_nav li").eq(current_circular).attr("value");
    $("#con4 .circular_con h3").text(con4_title);

    // 이미지 변경
    if(current_circular > 4){
      $("#con4 .circular_con img").attr("src", "img/circular_0" + (current_circular) + ".jpg")
    }else{
      $("#con4 .circular_con img").attr("src", "img/circular_0" + (current_circular + 1) + ".jpg")
    }
    
    // 텍스트 변경
    con4_text();
  }

  function con4_text(){
    switch (current_circular) {
      case 0:
        $("#con4 .circular_con h4").text("WE FOSTER A VALUES-BASED CULTURE AND CIRCULARITY EXPERTISE.");
        $("#con4 .circular_con p").text("우리는 사람, 지구, 경제적 성공 사이의 균형을 우선시하고 공통의 목적을 따릅니다. 이 의미 있는 기업 목표는 우리에게 앞으로 나아갈 길을 보여줍니다. 우리의 문화와 전문성을 통해 우리는 그렇게 할 수 있습니다.");
        break

      case 1:
        $("#con4 .circular_con h4").text("WE CREATE PRODUCTS WITH THEIR END IN MIND.");
        $("#con4 .circular_con p").text("버려진 재료의 재활용, 품질과 수명에 대한 집중, 그리고 모든 제품의 고유한 특성은 지난 30년 동안 우리의 특징이었습니다. 우리는 우리 제품이 이론적으로 내구성이 있을 뿐만 아니라 고객이 수년 동안 즐겁게 사용할 수 있도록 하는 것을 목표로 합니다.");
        break

      case 2:
        $("#con4 .circular_con h4").text("WE REDUCE OUR FOOTPRINT AND ENSURE A FAIR SUPPLY CHAIN.");
        $("#con4 .circular_con p").text("우리는 생태학적, 경제적으로 가장 합리적이고 안전하고 건강하며 공정한 근무 조건이 보장되는 곳에서 생산합니다. 우리는 취리히에 본사를 유지하고 유럽 생산자들과 동등한 입장에서 장기적인 파트너십을 구축하기로 의식적인 결정을 내렸습니다.");
        break

      case 3:
        $("#con4 .circular_con h4").text("WE PROVIDE SERVICES TO PROLONG AND CLOSE CYCLES.");
        $("#con4 .circular_con p").text("우리는 프로세스를 전체적으로 고려하고, 충분히 고려된 제품과 서비스로 사이클을 마무리하는 것을 목표로 합니다. 여기서 우리의 최우선 과제는 FREITAG 제품의 수명 주기를 연장하는 것입니다. 두 번째 단계로, 우리는 미래에 순환 자재가 폐쇄된 주기로 순환할 수 있도록 하는 회수 시스템을 구축하고 있습니다.");
        break

      case 4:
        $("#con4 .circular_con h4").text("WE CONNECT TO INSPIRE AND BE INSPIRED.");
        $("#con4 .circular_con p").text("순환경제는 혼자서는 불가능합니다. 원이 클수록 잠재력을 최대한 발휘할 수 있습니다. 이러한 이유로 우리는 이해관계자와의 교류를 촉진하고 있습니다. 우리는 이 대화를 주기 개발의 필수적인 부분으로 봅니다.");
    }
  }

  /*************************************************/
});
