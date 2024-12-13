export  class DateFormatter {
    static format(date: Date): string {
      
        const newDate = new Date(date);

        return Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        }).format(newDate);
  
  }
    
};
