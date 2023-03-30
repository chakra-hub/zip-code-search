form=document.getElementById("text_area");
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let zipcode=document.getElementsByClassName('input_field')[0].value;
    if(zipcode.trim()!=''){
        getZipcodeDetailsAndBuild(zipcode);
    }
    
})

function getZipcodeDetailsAndBuild(zipcode){
    fetch(`https://api.zippopotam.us/us/${zipcode}`)
            .then((response)=>{
                if(response.status!=200){
                    invalid_result=`<div class="invalid">
                    Invalid Zipcode! Please try again.
                    <button id="cross_btn_invalid" class="result_cross" onclick="cross(id)" >x</button>
                  </div>`
                  document.getElementsByClassName('result_container')[0].innerHTML=invalid_result;
                  throw Error(response.status);
                }
                else{
                    return response.json();
                }
            })
            .then(data => {
                location_result=`<div class="location_info">
                <h3>Location Info:<button id="cross_btn_valid" class="result_cross" onclick="cross(id)">x</button></h3>
                <ul class="all_info">
                  <li>City: ${data.places[0]['place name']}</li>
                  <li>Longitude: ${data.places[0].longitude}</li>
                  <li>Latitude: ${data.places[0].latitude}</li>
                </ul>
              </div>`;
              document.getElementsByClassName('result_container')[0].innerHTML=location_result;
            })
            .catch(error =>{
                console.log(error);
            })
 
}
function cross(id){
    if(id=="cross_btn_valid"){
    document.getElementById(id).parentElement.parentElement.style.display='none';
    document.getElementsByClassName('input_field')[0].value='';
    }
    else{
        document.getElementById(id).parentElement.style.display='none';
        document.getElementsByClassName('input_field')[0].value='';
    }
}


