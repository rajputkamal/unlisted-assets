import { useHistory } from "react-router-dom";


function getTransactionFee(isBuyer, totalAmountInvolved) {


    let transactionFee = 0

    if (totalAmountInvolved <= 300000) {
        transactionFee = 100;
    } else if (totalAmountInvolved > 300000 && totalAmountInvolved <= 500000) {
        transactionFee = 500;
    } else if (totalAmountInvolved > 500000 && totalAmountInvolved <= 1000000) {
        transactionFee = 2000;
    } else if (totalAmountInvolved > 1000000 && totalAmountInvolved <= 5000000) {
        transactionFee = 5000;
    } else if (totalAmountInvolved > 5000000 && totalAmountInvolved <= 10000000) {
        transactionFee = 10000;
    } else if (totalAmountInvolved > 10000000 && totalAmountInvolved <= 50000000) {
        transactionFee = 50000;
    } else if (totalAmountInvolved > 50000000) {
        transactionFee = 100000;
    }

    if(isBuyer == false) {
        transactionFee = 0
    }

    if(isBuyer == true) {
        transactionFee = 0
    }

    return transactionFee
}

export { getTransactionFee}