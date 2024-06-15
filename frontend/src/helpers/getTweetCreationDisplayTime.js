export const getTweetCreationDisplayTime = (currTweet) => {

    // I am hard coding time logic for IST (Indian Standard Time) 
    const tweetCreatedOnDate = currTweet.createdAt.split('T')[0].split('-').reverse().map( (str) => parseInt(str));
    const tweetCreatedOnUTC = currTweet.createdAt.split('T')[1].split(':').map( (str) => parseInt(str));
    
    const now = new Date(); 
    const offSetHrs = 5; 
    const offSetMins = 30; 
    
    let tweetCreationLocalTimeHrsPart = tweetCreatedOnUTC[0] + offSetHrs; 
    let tweetCreationLocalTimeMinsPart = tweetCreatedOnUTC[1] + offSetMins; 

    if(Math.floor(tweetCreationLocalTimeMinsPart / 60) >= 1){
        tweetCreationLocalTimeHrsPart += Math.floor(tweetCreationLocalTimeMinsPart / 60); 
        tweetCreationLocalTimeMinsPart = tweetCreationLocalTimeMinsPart % 60; 
    }

    let tweetCreatedOnLocalDate1stPart = tweetCreatedOnDate[0];

    if(Math.floor(tweetCreationLocalTimeHrsPart / 24) >= 1){
        tweetCreatedOnLocalDate1stPart += 1; 
        tweetCreationLocalTimeHrsPart = tweetCreationLocalTimeHrsPart % 24; 
    }

    const tweetCreatedOnLocalDate = [tweetCreatedOnLocalDate1stPart, tweetCreatedOnDate[1], tweetCreatedOnDate[2]]; 
    const tweetCreatedOnLocalTime = [tweetCreationLocalTimeHrsPart, tweetCreationLocalTimeMinsPart, tweetCreatedOnUTC[2]]; 
    
    const currLocalDate = [now.getDate(), now.getMonth()+1, now.getFullYear()]; 
    const currLocalTime = [now.getHours(), now.getMinutes(), now.getSeconds()]; 

    let displayTime; 
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 
    if(tweetCreatedOnLocalDate[0] === currLocalDate[0]){
        if(tweetCreatedOnLocalTime[0] === currLocalTime[0]){
            if(tweetCreatedOnLocalTime[1] === currLocalTime[1]){
                const timeDiffInSecs = currLocalTime[2] - tweetCreatedOnLocalTime[2];
                if(timeDiffInSecs === 1){
                    displayTime = `${timeDiffInSecs}sec ago`; 
                }
                else{
                    displayTime = `${timeDiffInSecs}secs ago`; 
                }
            }
            else{
                const timeDiffInMins = currLocalTime[1] - tweetCreatedOnLocalTime[1]; 
                if(timeDiffInMins === 1){
                    displayTime = `${timeDiffInMins}min ago`;	
                }
                else{
                    displayTime = `${timeDiffInMins}mins ago`;
                }
            }
        }
        else{
            const timeDiffInHrs = currLocalTime[0] - tweetCreatedOnLocalTime[0]; 
            if(timeDiffInHrs === 1){
                displayTime = `${timeDiffInHrs}hr ago`;	
            }
            else{
                displayTime = `${timeDiffInHrs}hrs ago`; 
            }
        }
    }
    else{
        if(tweetCreatedOnLocalDate[0]%10 === 1 && tweetCreatedOnLocalDate[0] !== 11){
            displayTime = `${tweetCreatedOnLocalDate[0]}st ${months[tweetCreatedOnLocalDate[1]-1]} ${tweetCreatedOnLocalDate[2]}`; 
        }
        else if(tweetCreatedOnLocalDate[0]%10 === 2 && tweetCreatedOnLocalDate[0] !== 12){
            displayTime = `${tweetCreatedOnLocalDate[0]}nd ${months[tweetCreatedOnLocalDate[1]-1]} ${tweetCreatedOnLocalDate[2]}`; 
        }
        else if(tweetCreatedOnLocalDate[0]%10 === 3 && tweetCreatedOnLocalDate[0] !== 13){
            displayTime = `${tweetCreatedOnLocalDate[0]}rd ${months[tweetCreatedOnLocalDate[1]-1]} ${tweetCreatedOnLocalDate[2]}`; 
        }
        else{
            displayTime = `${tweetCreatedOnLocalDate[0]}th ${months[tweetCreatedOnLocalDate[1]-1]} ${tweetCreatedOnLocalDate[2]}`; 
        }
    }

    return displayTime; 
}