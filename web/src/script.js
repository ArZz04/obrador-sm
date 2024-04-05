const API_URL = 'https://api-web.arzz.tech' || 'http://localhost:3000';
const API_URLs = 'http://localhost:3000';

async function getLastFamilyApi() {
    const url = `${API_URLs}/api/families/last`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las fechas de las familias ');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error al obtener la fecha de la familia ' + ':', error);
    }
}

async function refreshDates(){
    try {
        const lastFamily = await getLastFamilyApi();

        const familyNames = {
            1: 'RES',
            2: 'CERDO',
            3: 'POLLO',
            4: 'MARISCOS'
        };

        if (lastFamily) {
            for (let i = 0; i < lastFamily.length; i++) {
                const familyId = lastFamily[i].family_id;
                const familyName = familyNames[familyId];

                document.getElementById(`family-name-${i}`).innerText = familyName;
                document.getElementById(`family-lastdate-${i}`).innerText = lastFamily[i].lastmodified;
            }
        };
    } catch (error) {
        console.error('Error al obtener la fecha de la familia:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    refreshDates();
});