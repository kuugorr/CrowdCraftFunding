class Filters {

    constructor(sidebar, progManager){
        // the reference to the sidebar HTML element
        this.sidebar = sidebar;

        // reference to the prog manager
        this.progManager = progManager;
    }

    /**
     * The 'click' event handler
     * @param {*} event
     */
    onYearSelected = (event) => {
        // the HTML element that was clicked
        const el = event.target;
        // the 'data-id' property of that element
        const filterType = el.dataset.id;
        // removing and adding the 'active' class
        this.sidebarContainer.querySelector('a.active').classList.remove('active');
        el.classList.add('active');

        // properly fill up the progs array
        let progs = [];
        if(filterType === 'all') {
            progs = this.progManager.progs;
        }
        else {
            progs = this.progManager.getByYear(filterType);
        }

        // generate a new (custom) event to warn App.js of the change
        document.dispatchEvent(new CustomEvent('filter-selected', {detail: progs}));
    }

    onFilterSelected(filterType){
        
        
        // removing and adding the 'active' class
        this.sidebar.querySelector('a.active').classList.remove('active');
        const el = document.querySelector(`a[href='/progetti/${filterType}']`);
        el.classList.add('active');
        
        
        let progs = [];
        let filterTitle = '';


        switch(filterType){
            case('important'):
            progs = this.progManager.filterImportant();
                filterTitle = 'Importanti';
                break;
                
            case('2023'):
            progs = this.progManager.getByYear("2023");
                    filterTitle = '2023';
                    break; 
            case('2022'):
            progs = this.progManager.getByYear("2022");
                        filterTitle = '2022';
                        break;            

            default:
                progs =  this.progManager.getByProject(filterType);
                filterTitle = filterType + ' - Tutti';
                break;



        }
         
        return {progs: progs, title: filterTitle};

   }

}

export default Filters;