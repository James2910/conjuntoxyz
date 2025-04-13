import { useState } from "react";

export const useHamburguerMenu = () => {
    const today = new Date(); //Fecha actual
    const initialSecondDate = new Date();
    initialSecondDate.setDate(today.getDate() - 30); //Calcula la fecha 30 días antes
    
    const [secondDate, setSecondDate] = useState(initialSecondDate);

    const [purchasesList, setPurchasesList] = useState([])
    const [selectedPurchase, setSelectedPurchase] = useState([])
    const [selectedTotal, setSelectedTotal] = useState([])

    const [isOpen, setIsOpen] = useState(false);
    const [isPurchasesOpen, setIsPurchasesOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [isDetailsPurchaseOpen, setIsDetailsPurchaseOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    
    const togglePurchasesModal = () => {
        if (!isPurchasesOpen) {
            getClientPurchases(secondDate, today)
        }
        
        setIsPurchasesOpen(!isPurchasesOpen);
    };
    
    const toggleCalendarModal = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const toggleFilterSection = () => {
        setIsFilterExpanded(!isFilterExpanded);
    };
    
    const toggleDetailsModal = () => {
        setIsDetailsPurchaseOpen(!isDetailsPurchaseOpen);
    };


    const convertToValidDate = (dateToConvert) => {
        const formattedDate = new Intl.DateTimeFormat("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(dateToConvert)
            .split("/")
            .reverse()
            .join("-");
        
        return formattedDate
    }

    const handleCalendarChange = (selectedDate) => {
        setSecondDate(selectedDate);
        setIsCalendarOpen(false);
        getClientPurchases(selectedDate, today)
    };

    const formatDate = (editableDate) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        
        if (!editableDate || !(editableDate instanceof Date)) return '';
    
        const formattedDate = new Intl.DateTimeFormat('es-CO', options).format(editableDate);
    
        return formattedDate
            .replace(/(\d+)\s(\w+)\s(\d+)/, (_, day, month, year) => `${month.charAt(0).toUpperCase()}${month.slice(1)}. ${day} de ${year}`);
    };

    function reverseFormatDate(isoDate) {
        const dateParts = isoDate.split('-');
        const year = dateParts[0];
        const month = getMonthName(parseInt(dateParts[1], 10) - 1);
        const day = dateParts[2];
    
        return `${day} de ${month} de ${year}`;
    }
    
    // Función auxiliar para obtener el nombre del mes en español
    function getMonthName(monthIndex) {
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        return months[monthIndex];
    }

    const openPurchaseDetailsModal = (purchase, formattedTotal) => {
        setSelectedPurchase(purchase);
        setSelectedTotal(formattedTotal);
        toggleDetailsModal();
    };
    
    
    let groupedPurchases = {};
    const getClientPurchases = async (secondDate, today) => {
        try {
            const validSecondDate = convertToValidDate(secondDate);
            const validInitDate = convertToValidDate(today);
            
            dispatch(setLoadingGlobal(true))

            const {status, data} = await api.post("/levapan/client-purchases", {
                idERP: userData.clientId,
                fechaInicio: validSecondDate,
                fechaFin: validInitDate,
            });

            if (status === 200) {
                groupedPurchases = data.reduce((acc, purchase) => {
                    const { pedido_id, ...purchaseData } = purchase;
                    if (!acc[pedido_id]) {
                        acc[pedido_id] = {
                            pedido_id,
                            purchases: []
                        };
                    }
                    acc[pedido_id].purchases.push(purchaseData);
                    return acc;
                }, {});
                
                setPurchasesList(groupedPurchases);
            }
            dispatch(setLoadingGlobal(false))
            
        } catch (error) {
            dispatch(setLoadingGlobal(false))
            console.log(error)
        }
    }

    function formatNumberWithThousandsSeparator(number) {
        if (isNaN(number)) return 'Número inválido';
    
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }


    return {
        formatDate, 
        reverseFormatDate, 
        handleCalendarChange,
        openPurchaseDetailsModal, 
        toggleModal, 
        togglePurchasesModal, 
        toggleCalendarModal, 
        toggleFilterSection, 
        toggleDetailsModal,
        formatNumberWithThousandsSeparator,
        selectedPurchase,
        selectedTotal,
        isOpen,
        isPurchasesOpen,
        isFilterExpanded,
        purchasesList,
        isCalendarOpen,
        isDetailsPurchaseOpen,
        secondDate,
        today,
    }
}
