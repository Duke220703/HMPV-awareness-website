// Animate numbers counting up smoothly
function animateCount(element, start, end, duration) {
    let startTime = null;
  
    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const val = Math.min(Math.floor(start + (end - start) * (progress / duration)), end);
      element.textContent = val.toLocaleString();
      if (progress < duration) {
        requestAnimationFrame(animation);
      }
    }
  
    requestAnimationFrame(animation);
  }
  
  // Fetch COVID-19 data from API and update counters
  async function fetchCovidData() {
    try {
      const response = await fetch('https://data.incovid19.org/v4/min/data.min.json');
      const data = await response.json();
  
      // India state code 'TT' contains total data for India
      const totalCases = data['TT']?.total?.confirmed || 0;
      const totalDeaths = data['TT']?.total?.deceased || 0;
      const totalRecovered = data['TT']?.total?.recovered || 0;
  
      const casesElem = document.getElementById('covid-cases-india');
      const deathsElem = document.getElementById('covid-deaths-india');
      const recoveredElem = document.getElementById('covid-recovered-india');
  
      // Parse current displayed values or fallback to 0
      const currentCases = Number(casesElem.textContent.replace(/,/g, '')) || 0;
      const currentDeaths = Number(deathsElem.textContent.replace(/,/g, '')) || 0;
      const currentRecovered = Number(recoveredElem.textContent.replace(/,/g, '')) || 0;
  
      // Animate to new values over 800 milliseconds
      animateCount(casesElem, currentCases, totalCases, 800);
      animateCount(deathsElem, currentDeaths, totalDeaths, 800);
      animateCount(recoveredElem, currentRecovered, totalRecovered, 800);
  
    } catch (error) {
      console.error('Error fetching COVID-19 data:', error);
    }
  }
  
  // Run once immediately, then refresh every 1000 milliseconds (1 second)
  fetchCovidData();
  setInterval(fetchCovidData, 1000);
  
