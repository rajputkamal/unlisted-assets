import React from "react";
import "./Tab3.css";
import Graph from "./profitloss";
import { apiCall, apiCall1, downloadurl, setAccessToken } from "../../../Utils/Network"
import {useHistory} from "react-router-dom";
import Buttons from "../../../Components/Buttons";


import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import About from "../CompanyTabsSteps/Tab1";
import Ownership from "../CompanyTabsSteps/Tab2";
// import Financials from "../CompanyTabsSteps/Tab3";
import SummaryRisks from "../CompanyTabsSteps/Tab4";
import RecentNews from "../CompanyTabsSteps/Tab5";
import AdditionalInformation from "../CompanyTabsSteps/Tab6";
import { Breadcrumbs } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


let Financials =(props)=>{
    let history = useHistory()
    const [companyId, setCompanyId] = React.useState(props.companyId);

    const [companydetail,setCompanydetail]=React.useState([]);
    const [financialsStatementOfProfitAndLoss,setfinancialsStatementOfProfitAndLoss]=React.useState([]);
    const [financialsBalanceSheet,setfinancialsBalanceSheet]=React.useState([]);
    const [financialsRatioAnalysis,setfinancialsRatioAnalysis]=React.useState([]);
    const [financialsBorrowings,setfinancialsBorrowings]=React.useState([]);
    const [financialsCashFlowStatement,setfinancialsCashFlowStatement]=React.useState([]);
    const [financialsChargeSearchReport,setfinancialsChargeSearchReport]=React.useState([]);
    const [currency,setcurrency]=React.useState(10000000);



const bold = ["Revenue", "ProfitBeforeTax", "ProfitLossForPeriodFromContinuingOperations", "ProfitLossFromDiscontinuingOperationAfterTax", "ProfitLossForPeriod",
    "EquityAndLiabilities", "ShareholdersFunds", "NoncurrentLiabilities", "CurrentLiabilities", "Assets", "NoncurrentAssets", "FixedAssets", "CurrentAssets",
    "TotalAdjustmentsToProfitLoss", "TotalAdjustmentsForWorkingCapital", "NetCashFlowsFromUsedInFinancingActivities", "NetIncreaseDecreaseInCashAndCashEquivalents",
    "CashAndCashEquivalentsCashFlowStatement", "TotalCashAndCashEquivalents","ProfitBeforeExtraordinaryItemsAndTax", "TotalAdjustmentsToProfitLoss",
    "TotalAdjustmentsForWorkingCapital", "NetCashFlowsFromUsedInOperatingActivities", "NetCashFlowsFromUsedInFinancingActivities",
    "NetIncreaseDecreaseInCashAndCashEquivalents", "CashAndCashEquivalentsCashFlowStatement",
    "TotalCashAndCashEquivalents", "NetCashFlowsFromUsedInInvestingActivities"]
//shareholders

    React.useEffect(() => {
        // getcompanydetail()
        getfinancialsStatementOfProfitAndLoss()
        getfinancialsBalanceSheet()
        getfinancialsRatioAnalysis()
        // getfinancialsBorrowings()
        // getfinancialsChargeSearchReport()
        getfinancialsCashFlowStatement()

    }, []);
    // const getcompanydetail = async function (){
    //     let response1 = await apiCall("company/companydetailbyid/"+props.companyId,'GET','', history)
    //     console.log(response1)
    //     let responseJSON1 = await response1.json();
    //     console.log(responseJSON1)
    //     setCompanydetail(responseJSON1)
    //
    // }

    const getfinancialsStatementOfProfitAndLoss = async function (){
        let response1 = await apiCall("company/financials/"+props.companyId+"/StatementOfProfitAndLoss",'GET','', history)
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1)
        setfinancialsStatementOfProfitAndLoss(responseJSON1)

    }
    const getfinancialsBalanceSheet = async function (){
        let response1 = await apiCall("company/financials/"+props.companyId+"/BalanceSheet",'GET','', history)
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1)
        setfinancialsBalanceSheet(responseJSON1)

    }
    const getfinancialsRatioAnalysis = async function (){
        let response1 = await apiCall("company/financials/"+props.companyId+"/RatioAnalysis",'GET','', history)
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1)
        setfinancialsRatioAnalysis(responseJSON1)

    }
    const getfinancialsCashFlowStatement = async function (){
        let response1 = await apiCall("company/financials/"+props.companyId+"/CashFlowStatementIndirectMethod",'GET','', history)
        //console.log(response1)
        let responseJSON1 = await response1.json();
        //console.log(responseJSON1)
        setfinancialsCashFlowStatement(responseJSON1)

    }

    // const getfinancialsBorrowings = async function (){
    //     let response1 = await apiCall("company/financials/"+props.companyId+"/Borrowings",'GET','', history)
    //     console.log(response1)
    //     let responseJSON1 = await response1.json();
    //     console.log(responseJSON1)
    //     setfinancialsBorrowings(responseJSON1)
    //
    // }
    // const getfinancialsChargeSearchReport = async function (){
    //     let response1 = await apiCall("company/financials/"+props.companyId+"/ChargeSearchReport",'GET','', history)
    //     console.log(response1)
    //     let responseJSON1 = await response1.json();
    //     console.log(responseJSON1)
    //     setfinancialsChargeSearchReport(responseJSON1)
    //
    // }
    const nameAlias = (name) => {
        let alias = name
//Balance Sheet


        if(name == "OtherAdjustmentsForWhichCashEffectsAreInvestingOrFinancingCashFlow") {return "Other Adjustments For Investing Or Financing Items"}
            if(name == "CashFlowsFromLosingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities") {return "Cash Flows From Losing Control of Subsidiaries"}
                if(name == "CashReceiptsFromRepaymentOfAdvancesAndLoansMadeToOtherPartiesClassifiedAsInvestingActivities") {return "Receipt from Repayment Of Advances And Loans"}
                    if(name == "CashPaymentsForFutureContractsForwardContractsOptionContractsAndSwapContractsClassifiedAsInvestingActivities") {return "Cash Payments For Future/Options Contracts" }
                        if(name == "CashReceiptsFromFutureContractsForwardContractsOptionContractsAndSwapContractsClassifiedAsInvestingActivities") {return "Cash Receipts From Future/Options Contracts" }
                            if(name == "IncomeTaxesPaidRefundClassifiedAsInvestingActivities") {return "Taxes Paid/Classified As Investing Activities"}
                                if(name == " AdjustmentsForDecreaseIncreaseInInventories") {return "Adjustments For Decrease/Increase In Inventories"}
                                if(name == " TotalAdjustmentsForReconcileProfitLoss") {return "Total Adjustments For Reconcile Profit/Loss"}
                                if(name == " DividendsReceivedClassifiedAsInvestingActivities") {return "Dividends Received/Classified As Investing Activities"}
                                if(name == " InterestReceivedClassifiedAsInvestingActivities") {return "Interest Received/Classified As Investing Activities"}
                                if(name=="CashFlowsUsedInObtainingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities"){return "Cash Flows Used In Obtaining Control of Subsidiaries"}

                                if(name == "Assets") {       return "Assets"
        }

        if(name == "CashAndBankBalances") {      return "Cash And BankBalances"  }
        if(name == "CurrentAssets") {       return "CurrentAssets"
        }
        if(name == "CurrentInvestments") {       return "Current Investments"     }
        if(name == "CurrentLiabilities") {       return "Current Liabilities"     }
        if(name == "DeferredGovernmentGrants") {       return "Deferred Government Grants"     }
        if(name == "DeferredTaxAssetsNet") {       return "Deferred Tax AssetsNet"     }
        if(name == "DeferredTaxLiabilitiesNet") {     return "Deferred Ta xLiabilities Net" }
        if(name == "EquityAndLiabilities") {      return "Equity And Liabilities" }
        if(name == "FixedAssets") {      return "Fixed Assets" }

        if(name == "ForeignCurrencyMonetaryItemTranslationDifferenceAssetAccount") {
            return "FCMITDA Asset Account"}

        if(name == "ForeignCurrencyMonetaryItemTranslationDifferenceLiabilityAccount") {return "FCMITDA Liability Account"     }

                if(name == "IntangibleAssets") {      return "Intangible Assets"     }

                    if(name == "IntangibleAssetsUnderDevelopmentOrWorkInProgress") {      return "Intangibles Under Development or WIP"     }

                        if(name == "Inventories") {      return "Inventories"     }
                            if(name == "LongTermBorrowings") {      return "Long Term Borrowings"     }
                                if(name == "LongTermLoansAndAdvances") {      return "Long Term Loans And Advances"     }
                                    if(name == "LongTermProvisions") {      return "Long Term Provisions "     }
                                        if(name == "MinorityInterest") {      return "Minority Interest "     }

                                            if(name == "MoneyReceivedAgainstShareWarrants") {    return "Money Received against SW" }
                                            if(name == "NoncurrentAssets")  {
                                                return "Non current Assets"     }
                                                if(name == "NoncurrentInvestments") {
                                                    return "Non current Investments"     }
                                                    if(name == "NoncurrentLiabilities") {
                                                        return "Non current Liabilities"     }
                                                        if(name == "OtherCurrentAssets") {
                                                            return "Other Current Assets"     }
                                                            if(name == "OtherCurrentLiabilities") {
                                                                return "Other Current Liabilities"     }
                                                                if(name == "OtherLongTermLiabilities") {
                                                                    return "Other Long Term Liabilities"     }
                                                                    if(name == "OtherNoncurrentAssets") {
                                                                        return "Other Non CurrentAssets"     }

                                                                        if(name == "PreproducingProperties") {
                                                                            return "Pre producing Properties"     }
                                                                            if(name == "ProducingProperties") {
                                                                                return "Producing Properties"     }
                                                                                if(name == "ReservesAndSurplus") {
                                                                                    return "Reserve sAnd Surplus"     }
                                                                                    if(name == "ShareApplicationMoneyPendingAllotment") {
                                                                                        return "Application Money Pending Allotment"     }
                                                                                        if(name == "ShareCapital") {
                                                                                            return "Share Capital"     }
                                                                                            if(name == "ShareholdersFunds") {
                                                                                                return "Shareholder’s Funds"     }
                                                                                                if(name == "ShortTermBorrowings")  {
    return "Short Term Borrowings"
}
if(name == "ShortTermLoansAndAdvances") {
    return "Short Term Loans And Advances"
}
if(name == "ShortTermProvisions") {       return "Short Term Provisions"
}

if(name == "TangibleAssets") {       return "Tangible Assets"
}
if(name == "TangibleAssetsCapitalWorkInProgress") {       return "Tangible Assets CWIP"
}
if(name == "TradePayables") {       return "Trade Payables"
}
if(name == "TradeReceivables") {       return "Trade Receivables"
}




//Profit & Loss
if(name == "ChangesInInventoriesOfFinishedGoodsWorkInProgressAndStockInTrade") {       return "Changes In Inventories Of FG, WIP And SIT"
}
if(name == "DepreciationDepletionAndAmortisationExpense") {       return "Depreciation And Amortisation Expense"
}
if(name == "ProfitBeforeExtraordinaryItemsAndTax") {       return "PBT before Extraordinary Item"
}
if(name == "ProfitLossForPeriodFromContinuingOperations") {       return "PAT from Continuing Operation"
}
if(name == "ProfitLossFromDiscontinuingOperationAfterTax") {       return "Profit Loss From Discontinuing Operation After Tax"
}
if(name == "ProfitLossFromDiscontinuingOperationsBeforeTax") {       return "PBT from Discontinuing Operation"
}
if(name == "TaxExpenseOfDiscontinuingOperations") {       return "Tax Of Discontinuing Operations"
}

//Ratio
if(name == "AssetTurnoverRatio") {       return "Asset Turnover Ratio"
}
if(name == "CapitalExpenditureCoverageRatio") {       return "Capex Coverage Ratio"
}
if(name == "CashConversionCycle") {       return "Cash Conversion Cycle"
}
if(name == "CashGeneratingPower") {       return "Cash Generating Power"
}
if(name == "CurrentRatio") {       return "Current Ratio"
}
if(name == "DebtEquityRatio") {       return "Debt Equity Ratio"
}
if(name == "DebtorsOutstandingDays") {       return "Debtors O/S Days"
}
if(name == "EBDITAGrowth") {       return "EBDITA Growth"
}
if(name == "EBDITAMargin") {       return "EBDITA Margin"
}
if(name == "EPSGrowth") {       return "EPS Growth"
}
if(name == "FreeCashFlowPercentage") {       return "FreeCashFlow%"
}
if(name == "InterestCoverage") {       return "Interest Coverage"
}
if(name == "InventoryHoldingDays") {       return "Inventory Holding Days"
}
if(name == "InventoryTurnoverRatio") {       return "Inventory T/O Ratio"
}
if(name == "LeverageTOLTNW") {       return "Leverage TOLTNW"
}
if(name == "OperatingCashMargin") {       return "Operating Cash Margin"
}
if(name == "OperatingRevenueGrowth") {       return "EBIT Growth"
}
if(name == "PATMargin") {       return "PAT Margin"
}
if(name == "ReturnOnCapitalEmployed") {       return "ROCE"
}
if(name == "ReturnOnEquity") {       return "Return On Equity"
}
if(name == "ShortTermDebtCoverageRatio") {       return "STL Coverage Ratio"
}
if(name == "TradePayableDays") {       return "Trade Payable Days"
}
if(name == "WorkingCapitalTurnover") {       return "WC T/O Ratio"
}


//CashFlow
if(name == "AdjustmentsForImpairmentLossReversalOfImpairmentLossRecognisedInProfitOrLoss") {       return "Adjustments For Impairment Loss Reversal"
}
if(name == "OtherAdjustmentsForWhichCashEffectsAreInvestingOrFinancingCashFlow") {       return "Other Adjustments For Investing Or Financing Itemsl"
}
if(name =="ShareOfProfitAndLossFromPartnershipFirmOrAssociationOfPersonsOrLimitedLiabilityPartnerships") {       return "Share of P&L from FIRM/AOP/LLP"
}
if(name == "AdjustmentsForIncreaseDecreaseInOtherCurrentLiabilities") {       return "Adjustments For Change In Other CL"
}
if(name == "IncomeTaxesPaidRefundClassifiedAsOperatingActivities") {       return "Taxes Paid Classified As Operating Activities"
}
if(name == "OtherInflowsOutflowsOfCashClassifiedAsOperatingActivities") {       return "Other Items classified as Operating Activities"
}
if(name == "ProceedsFromExtraordinaryItemsClassifiedAsOperatingActivities") {       return "Proceeds From Operating Extraordinary Items"
}
if(name == "PaymentForExtraordinaryItemsClassifiedAsOperatingActivities") {       return "Payment For Operating Extraordinary Items"
}
if(name == "CashFlowsFromLosingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities") {       return "Cash Flows From Losing Control"
}
if(name == "CashFlowsUsedInObtainingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities") {       return "Cash Flows UsedIn Obtaining Control"
}
if(name == "OtherCashReceiptsFromSalesOfEquityOrDebtInstrumentsOfOtherEntitiesClassifiedAsInvestingActivities") {       return "Other Receipts From Sales Of Financial Instruments"
}


if(name == "OtherCashPaymentsToAcquireEquityOrDebtInstrumentsOfOtherEntitiesClassifiedAsInvestingActivities") {
    return "Other Payments to Acquire Financial Instruments"
}
if(name == "OtherCashReceiptsFromSalesOfInterestsInJointVenturesClassifiedAsInvestingActivities") {       return "Other Receipts From Sales Of Interests In JV"
}
if(name == "OtherCashPaymentsToAcquireInterestsInJointVenturesClassifiedAsInvestingActivities") {       return "Other Payments to Acquire Interests In JV"
}
if(name == "CashReceiptsFromShareOfProfitsOfPartnershipFirmOrAssociationOfPersonsOrLimitedLiabilityPartnerships") {       return "Receipt from Share of P&L from FIRM/AOP/LLP"
}
if(name == "CashPaymentForInvestmentInPartnershipFirmOrAssociationOfPersonsOrLimitedLiabilityPartnerships") {       return "Payment For Investment in FIRM/AOP/LLP"
}
if(name == "ProceedsFromSalesOfTangibleAssetsClassifiedAsInvestingActivities") {       return "Proceeds From Sales Of Tangible Assets"
}

if(name == "PurchaseOfTangibleAssetsClassifiedAsInvestingActivities") {       return "Purchase Of Tangible Assets"
}
if(name == "ProceedsFromSalesOfIntangibleAssetsClassifiedAsInvestingActivities") {       return "Proceeds From Sales Of Intangible Assets"
}
if(name == "PurchaseOfIntangibleAssetsClassifiedAsInvestingActivities") {       return "Purchase Of Intangible Assets"
}
if(name == "CashAdvancesAndLoansMadeToOtherPartiesClassifiedAsInvestingActivities") {       return "Advances And Loans Made To Other Parties"
}
if(name == "CashReceiptsFromRepaymentOfAdvancesAndLoansMadeToOtherPartiesClassifiedAsInvestingActivities") {       return "Receipt from RepaymentOfAdvancesAndLoans"
}


if(name == "CashPaymentsForFutureContractsForwardContractsOptionContractsAndSwapContractsClassifiedAsInvestingActivities") {       return "Cash Payments For Contracts"
}
if(name == "CashReceiptsFromFutureContractsForwardContractsOptionContractsAndSwapContractsClassifiedAsInvestingActivities") {       return "Cash Receipts From Contracts"
}
if(name == "IncomeTaxesPaidRefundClassifiedAsInvestingActivities") {       return "Taxes Paid Classified As Investing Activities"
}
if(name == "OtherInflowsOutflowsOfCashClassifiedAsInvestingActivities") {       return "Other Cash Flows Classified As Investing Activities"
}
if(name == "ProceedsFromGovernmentGrantsClassifiedAsInvestingActivities") {       return "Proceeds From Government Grants"
}
if(name == "ProceedsFromExtraordinaryItemsClassifiedAsInvestingActivities") {       return "Proceeds From Investing Extraordinary Items"
}
if(name == "PaymentForExtraordinaryItemsClassifiedAsInvestingActivities") {       return "Payment For Investing Extraordinary Items"
}
if(name == "ProceedsFromBorrowingsClassifiedAsFinancingActivities") {       return "Proceeds From Borrowings"
}
if(name == "RepaymentsOfBorrowingsClassifiedAsFinancingActivities") {       return "Repayments Of Borrowings"
}
if(name == "IncomeTaxesPaidRefundClassifiedAsFinancingActivities") {       return "Taxes Paid Classified As Financing Activities"
}
if(name == "OtherInflowsOutflowsOfCashClassifiedAsFinancingActivities") {       return "Other Cash Flows Classified As Financing Activities"
}
if(name == "ProceedsFromExtraordinaryItemsClassifiedAsFinancingActivities") {       return "Proceeds From Financial Extraordinary Items"
}
if(name == "PaymentForExtraordinaryItemsClassifiedAsFinancingActivities") {       return "Payment For Financial Extraordinary Items"
}
if(name == "PaymentForExtraordinaryItemsClassifiedAsFinancingActivities") {       return "Payment For Financial Extraordinary Items"
}
if(name == "NetIncreaseDecreaseInCashAndCashEquivalentsBeforeEffectOfExchangeRateChanges") {       return "Net Change Before Effect Of Exchange Rate"
}
if(name == "EffectOfExchangeRateChangesOnCashAndCashEquivalents") {       return "Effect Of Exchange Rate Changes"
}
if(name == "OtherDifferencesToCashAndCashEquivalentsInStatementOfCashFlows") {       return "Other Differences To Cash And Cash Equivalents"
}
if(name == "OtherDifferencesToCashAndCashEquivalentsInStatementOfCashFlows") {       return "Other Differences To Cash And Cash Equivalents"
}
if(name == "AdjustmentsForFinanceCosts") {       return "Adjustments For Finance Costs"     } if(name == "AdjustmentsForDepreciationAndAmortisationExpense") {       return "Adjustments For Depreciation And Amortisation Expense"     }  if(name == "AdjustmentsForUnrealisedForeignExchangeLossesGains") {       return "Adjustments For Unrealised Foreign Exchange Losses Gains"     }
if(name == "AdjustmentsForDividendIncome") {       return "Adjustments For Dividend Income"     }
if(name == "AdjustmentsForSharebasedPayments") {       return "Adjustments For Share based Payments"     }
if(name == "OtherAdjustmentsToReconcileProfitLoss") {       return "Other Adjustments To Reconcile Profit Loss"     }
if(name == "OtherAdjustmentsForNoncashItems") {       return "Other Adjustments For Non-cash Items"     }
if(name == "TotalAdjustmentsToProfitLoss") {       return "Total Adjustments To Profit Loss"     }
if(name == "AdjustmentsForDecreaseIncreaseInInventories") {       return "Adjustments For Decrease Increase In Inventories"     }
if(name == "AdjustmentsForDecreaseIncreaseInTradeReceivables") {       return "Adjustments For Decrease Increase In Trade Receivables"     }
if(name == "AdjustmentsForDecreaseIncreaseInOtherCurrentAssets") {       return "Adjustments For Decrease Increase In Other Current Assets"     }
if(name == "AdjustmentsForIncreaseDecreaseInTradePayables") {       return "Adjustments For Increase Decrease In Trade Payables"     }
if(name == "AdjustmentsForProvisions") {       return "Adjustments For Provisions"     }
if(name == "TotalAdjustmentsForWorkingCapital") {       return "Total Adjustments For Working Capital"     }
if(name == "TotalAdjustmentsForReconcileProfitLoss") {       return "Total Adjustments For Reconcile Profit Loss"     }
if(name == "DividendsReceivedClassifiedAsOperatingActivities") {       return "Dividends Received Classified As Operating Activities"     } if(name == "InterestPaidClassifiedAsOperatingActivities") {       return "Interest Paid Classified As Operating Activities"     }
if(name == "InterestReceivedClassifiedAsOperatingActivities") {       return "Interest Received Classified As Operating Activities"     }
if(name == "NetCashFlowsFromUsedInOperatingActivities") {       return "Net Cash Flows From Used In Operating Activities"     }
if(name == "DividendsReceivedClassifiedAsInvestingActivities") {       return "Dividends Received Classified As Investing Activities"     }
if(name == "InterestReceivedClassifiedAsInvestingActivities") {       return "Interest Received Classified As Investing Activities"     }
if(name == "NetCashFlowsFromUsedInInvestingActivities") {       return "Net Cash Flows From Used In Investing Activities"     }
if(name == "ProceedsFromIssuingShares") {       return "Proceeds From Issuing Shares"     }
if(name == "ProceedsFromIssuingOtherEquityInstruments") {       return "Proceeds From Issuing Other Equity Instruments"     }
if(name == "ProceedsFromIssuingDebenturesNotesBondsEtc") {       return "Proceeds From Issuing Debentures Notes Bonds Etc"     }
if(name == "DividendsPaidClassifiedAsFinancingActivities") {       return "Dividends Paid Classified As Financing Activities"     } if(name == "InterestPaidClassifiedAsFinancingActivities") {       return "Interest Paid Classified As Financing Activities "     }
if(name == "NetCashFlowsFromUsedInFinancingActivities") {       return "Net Cash Flows From Used In Financing Activities"     }
if(name == "NetIncreaseDecreaseInCashAndCashEquivalents") {       return "Net Increase Decrease In Cash And Cash Equivalents"     }
if(name == "CashAndCashEquivalentsCashFlowStatement") {       return "Cash And Cash Equivalents Cash Flow Statement"     }
if(name == "BankOverdraftsClassifiedAsCashEquivalents") {       return "Bank Overdrafts Classified As Cash Equivalents"     }
if(name == "TotalCashAndCashEquivalents") {       return "Total Cash And Cash Equivalents"

    if(name == "ProfitLossFromDiscontinuingOperationAfterTax") {             return "Profit Loss From Discontinuing Operation After Tax"
    }
    if(name == "ProfitLossFromDiscontinuingOperationsBeforeTax") {             return "PBT from Discontinuing Operation"
    }
    if(name == "TaxExpenseOfDiscontinuingOperations") {             return "Tax Of Discontinuing Operations"
    }
    if(name == "Revenue") {             return "Revenue"
    }
    if(name == "RevenueFromOperations") {             return "Revenue From Operations"
    }
    if(name == "RevenueFromSaleOfProducts") {             return "Revenue From Sale Of Products"
    }
    if(name == "RevenueFromSaleOfServices") {             return "Revenue From Sale Of Services"
    }
    if(name == "OtherOperatingRevenues") {             return "Other Operating Revenues"
    }
    if(name == "OtherIncome") {             return "Other Income"
    }
    if(name == "ServiceTaxCollected") {             return "Service Tax Collected"
    }
    if(name == "OtherDutiesTaxesCollected") {             return "Other Duties Taxes Collected"
    }
    if(name == "PurchasesOfStockInTrade") {             return "Purchases Of Stock In Trade"
    }
    if(name == "CostOfMaterialsConsumed") {             return "Cost Of Materials Consumed"
    }
    if(name == "ExciseDuty") {             return "Excise Duty"
    }
    if(name == "EmployeeBenefitExpense") {             return "Employee Benefit Expense"
    }
    if(name == "FinanceCosts") {             return "Finance Costs"
    }
    if(name == "OtherExpenses") {             return "Other Expenses"
    }
    if(name == "ExceptionalItemsBeforeTax") {             return "Exceptional Items Before Tax"
    }
    if(name == "ExtraordinaryItemsBeforeTax") {             return "Extraordinary Items Before Tax"
    }

    if(name == "ProfitBeforeTax") {             return "Profit Before Tax"
    }
    if(name == "CurrentTax") {             return "Current Tax"
    }
    if(name == "DeferredTax") {             return "Deferred Tax"
    }
    if(name == "TaxExpense") {             return "Tax Expense"
    }
    if(name == "ProfitLossForPeriod") {             return "Profit Loss For Period"
    }
    if(name == "BasicEarningPerEquityShare") {             return "Basic Earning Per Equity Share"
    }
    if(name == "DilutedEarningsPerEquityShare") {             return "Diluted Earnings Per Equity Share"
    }
    if(name == "AssetTurnoverRatio") {             return "Asset Turnover Ratio Times"
    }
    if(name == "CapitalExpenditureCoverageRatio") {             return "Capital Expenditure Coverage Ratio Times"
    }
    if(name == "CashConversionCycle") {             return "Cash Conversion Cycle Days"
    }
    if(name == "CashGeneratingPower") {             return "Cash Generating Power %"
    }
    if(name == "CurrentRatio") {             return "Current Ratio Times"
    }
    if(name == "DebtEquityRatio") {             return "Debt Equity Ratio Times"
    }
    if(name == "DebtorsOutstandingDays") {             return "Debtors O/S Days"
    }
    if(name == "EBDITAGrowth") {             return "EBDITA Growth %"
    }
    if(name == "EBDITAMargin") {             return "EBDITA Margin %"
    }
    if(name == "EPSGrowth") {             return "EPS Growth %"
    }
    if(name == "FreeCashFlowPercentage") {             return "Free Cash Flow %"
    }
    if(name == "InterestCoverage") {             return "Interest Coverage Times"
    }
    if(name == "InventoryHoldingDays") {             return "Inventory Holding Days"
    }
    if(name == "InventoryTurnoverRatio") {             return "Inventory T/O Ratio Times"
    }
    if(name == "LeverageTOLTNW") {             return "Leverage TOLTNW Times"
    }
    if(name == "OperatingCashMargin") {             return "Operating Cash Margin %"
    }
    if(name == "OperatingRevenueGrowth") {             return "Operating Revenue Growth %"
    }
    if(name == "PATMargin") {             return "PAT Margin %"
    }
    if(name == "ReturnOnCapitalEmployed") {             return "ROCE %"
    }
    if(name == "ReturnOnEquity") {             return "Return On Equity %"
    }
    if(name == "ShortTermDebtCoverageRatio") {             return "STL Coverage Ratio Times"
    }
    if(name == "TradePayableDays") {             return "Trade Payable Days"
    }
    if(name == "WorkingCapitalTurnover") {             return "Working Capital Turnover Times"
    }

    // CashFlow
    if(name == "AdjustmentsForImpairmentLossReversalOfImpairmentLossRecognisedInProfitOrLoss") {             return "Adjustments For Impairment Loss Reversal"
    }
    if(name == "OtherAdjustmentsForWhichCashEffectsAreInvestingOrFinancingCashFlow") {             return "Other Adjustments For Investing Or Financing Items"
    }
    if(name =="ShareOfProfitAndLossFromPartnershipFirmOrAssociationOfPersonsOrLimitedLiabilityPartnerships") {            return "Share of P&L from FIRM/AOP/LLP"
    }
    if(name == "AdjustmentsForIncreaseDecreaseInOtherCurrentLiabilities") {             return "Adjustments For Change In Other CL"
    }
    if(name == "IncomeTaxesPaidRefundClassifiedAsOperatingActivities") {             return "Taxes Paid Classified As Operating Activities"
    }
    if(name == "OtherInflowsOutflowsOfCashClassifiedAsOperatingActivities") {             return "Other Items classified as Operating Activities"
    }
    if(name == "ProceedsFromExtraordinaryItemsClassifiedAsOperatingActivities") {             return "Proceeds From Operating Extraordinary Items"
    }
    if(name == "PaymentForExtraordinaryItemsClassifiedAsOperatingActivities") {             return "Payment For Operating Extraordinary Items"
    }
    if(name == "CashFlowsFromLosingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities") {             return "Cash Flows From Losing Control of Subsidiaries"
    }
    if(name == "CashFlowsUsedInObtainingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities") {             return "Cash Flows Used In Obtaining Control of Subsidiaries"
}
        if(name == "OtherCashReceiptsFromSalesOfEquityOrDebtInstrumentsOfOtherEntitiesClassifiedAsInvestingActivities") {             return "Other Receipts From Sales Of Financial Instruments"
        }


        if(name == "OtherCashPaymentsToAcquireEquityOrDebtInstrumentsOfOtherEntitiesClassifiedAsInvestingActivities") {           return "Other Payments to Acquire Financial Instruments"
        }
        if(name == "OtherCashReceiptsFromSalesOfInterestsInJointVenturesClassifiedAsInvestingActivities") {             return "Other Receipts From Sales Of Interests In JV"
        }
        if(name == "OtherCashPaymentsToAcquireInterestsInJointVenturesClassifiedAsInvestingActivities") {             return "Other Payments to Acquire Interests In JV"
        }
        if(name == "CashReceiptsFromShareOfProfitsOfPartnershipFirmOrAssociationOfPersonsOrLimitedLiabilityPartnerships") {             return "Receipt from Share of P&L from FIRM/AOP/LLP"
        }
        if(name == "CashPaymentForInvestmentInPartnershipFirmOrAssociationOfPersonsOrLimitedLiabilityPartnerships") {             return "Payment For Investment in FIRM/AOP/LLP"
        }
        if(name == "ProceedsFromSalesOfTangibleAssetsClassifiedAsInvestingActivities") {             return "Proceeds From Sales Of Tangible Assets"
        }
        if(name == "PurchaseOfTangibleAssetsClassifiedAsInvestingActivities") {             return "Purchase Of Tangible Assets"
        }
        if(name == "ProceedsFromSalesOfIntangibleAssetsClassifiedAsInvestingActivities") {             return "Proceeds From Sales Of Intangible Assets"
        }
        if(name == "PurchaseOfIntangibleAssetsClassifiedAsInvestingActivities") {             return "Purchase Of Intangible Assets"
        }
        if(name == "CashAdvancesAndLoansMadeToOtherPartiesClassifiedAsInvestingActivities") {             return "Advances And Loans Made To Other Parties"
        }
        if(name == "CashReceiptsFromRepaymentOfAdvancesAndLoansMadeToOtherPartiesClassifiedAsInvestingActivities") {             return "Receipt from Repayment Of Advances And Loans"
        }


        if(name == "CashPaymentsForFutureContractsForwardContractsOptionContractsAndSwapContractsClassifiedAsInvestingActivities") {             return "Cash Payments For Future/options Contracts"
        }
        if(name == "CashReceiptsFromFutureContractsForwardContractsOptionContractsAndSwapContractsClassifiedAsInvestingActivities") {             return "Cash Receipts From Future/Options Contracts"
        }
        if(name == "IncomeTaxesPaidRefundClassifiedAsInvestingActivities") {             return "Taxes Paid/Classified As Investing Activities"
        }
        if(name == "OtherInflowsOutflowsOfCashClassifiedAsInvestingActivities") {             return "Other Cash Flows Classified As Investing Activities"
        }
        if(name == "ProceedsFromGovernmentGrantsClassifiedAsInvestingActivities") {             return "Proceeds From Government Grants as Investing Activities"
        }
        if(name == "ProceedsFromExtraordinaryItemsClassifiedAsInvestingActivities") {             return "Proceeds From Investing Extraordinary Items"
        }
        if(name == "PaymentForExtraordinaryItemsClassifiedAsInvestingActivities") {             return "Payment For Investing Extraordinary Items"
        }
        if(name == "ProceedsFromBorrowingsClassifiedAsFinancingActivities") {             return "Proceeds From Borrowings"
        }
        if(name == "RepaymentsOfBorrowingsClassifiedAsFinancingActivities") {             return "Repayments Of Borrowings"
        }
        if(name == "IncomeTaxesPaidRefundClassifiedAsFinancingActivities") {             return "Taxes Paid Classified As Financing Activities"
        }
        if(name == "OtherInflowsOutflowsOfCashClassifiedAsFinancingActivities") {             return "Other Cash Flows Classified As Financing Activities"
        }
        if(name == "ProceedsFromExtraordinaryItemsClassifiedAsFinancingActivities") {             return "Proceeds From Financial Extraordinary Items"
        }
        if(name == "PaymentForExtraordinaryItemsClassifiedAsFinancingActivities") {             return "Payment For Financial Extraordinary Items"
        }
        if(name == "NetIncreaseDecreaseInCashAndCashEquivalentsBeforeEffectOfExchangeRateChanges") {             return "Net Change Before Effect Of Exchange Rate"
        }
        if(name == "EffectOfExchangeRateChangesOnCashAndCashEquivalents") {             return "Effect Of Exchange Rate Changes"
        }
        if(name == "OtherDifferencesToCashAndCashEquivalentsInStatementOfCashFlows") {             return "Other Differences To Cash And Cash Equivalents"
        }
        if(name == "AdjustmentsForFinanceCosts") {             return "Adjustments For Finance Costs"         }  
        if(name == "AdjustmentsForDepreciationAndAmortisationExpense") {             return "Adjustments For Depreciation And Amortisation Expense"         }  if(name == "AdjustmentsForUnrealisedForeignExchangeLossesGains") {             return "Adjustments For Unrealised Foreign Exchange Losses Gains"         }
        if(name == "AdjustmentsForDividendIncome") {             return "Adjustments For Dividend Income"         }
        if(name == "AdjustmentsForSharebasedPayments") {             return "Adjustments For Share based Payments"         }
        if(name == "OtherAdjustmentsToReconcileProfitLoss") {             return "Other Adjustments To Reconcile Profit Loss"         }
        if(name == "OtherAdjustmentsForNoncashItems") {             return "Other Adjustments For Non-cash Items "         }
        if(name == "TotalAdjustmentsToProfitLoss") {             return "Total Adjustments To Profit Loss"         }
        if(name == "AdjustmentsForDecreaseIncreaseInInventories") {             return "Adjustments For Decrease Increase In Inventories "         }
        if(name == "AdjustmentsForDecreaseIncreaseInTradeReceivables") {             return "Adjustments For Decrease Increase In Trade Receivables"         }
        if(name == "AdjustmentsForDecreaseIncreaseInOtherCurrentAssets") {             return "Adjustments For Decrease Increase In Other Current Assets"         }
        if(name == "AdjustmentsForIncreaseDecreaseInTradePayables") {             return "Adjustments For Increase Decrease In Trade Payables"         }
        if(name == "AdjustmentsForProvisions") {             return "Adjustments For Provisions"         }
        if(name == "TotalAdjustmentsForWorkingCapital") {             return "Total Adjustments For Working Capital"         }
        if(name == "TotalAdjustmentsForReconcileProfitLoss") {             return "Total Adjustments For Reconcile Profit/Loss "         }
        if(name == "DividendsReceivedClassifiedAsOperatingActivities") {             return "Dividends Received Classified As Operating Activities"         } if(name == "InterestPaidClassifiedAsOperatingActivities") {             return "Interest Paid Classified As Operating Activities"         }
        if(name == "InterestReceivedClassifiedAsOperatingActivities") {             return "Interest Received Classified As Operating Activities"         }
        if(name == "NetCashFlowsFromUsedInOperatingActivities") {             return "Net CashFlows From Used In Operating Activities "         }
        if(name == "DividendsReceivedClassifiedAsInvestingActivities") {             return "Dividends Received/Classified As Investing Activities"         }
        if(name == "InterestReceivedClassifiedAsInvestingActivities") {             return "Interest Received/Classified As Investing Activities"         }
        if(name == "NetCashFlowsFromUsedInInvestingActivities") {             return "Net Cash Flows From Used In Investing Activities"         }
        if(name == "ProceedsFromIssuingShares") {             return "Proceeds From Issuing Shares"         }
        if(name == "ProceedsFromIssuingOtherEquityInstruments") {             return "Proceeds From Issuing Other Equity Instruments"         }
        if(name == "ProceedsFromIssuingDebenturesNotesBondsEtc") {             return "Proceeds From Issuing Debentures Notes Bonds Etc"         }
        if(name == "DividendsPaidClassifiedAsFinancingActivities") {             return "Dividends Paid Classified As Financing Activities"         } if(name == "InterestPaidClassifiedAsFinancingActivities") {             return "Interest Paid Classified As Financing Activities "         }
        if(name == "NetCashFlowsFromUsedInFinancingActivities") {             return "Net Cash Flows From Used In Financing Activities"         }
        if(name == "NetIncreaseDecreaseInCashAndCashEquivalents") {             return "Net Increase Decrease In Cash And Cash Equivalents"         }
        if(name == "CashAndCashEquivalentsCashFlowStatement") {             return "Cash And Cash Equivalents Cash Flow Statement"         }
        if(name == "BankOverdraftsClassifiedAsCashEquivalents") {             return "Bank Overdrafts Classified As Cash Equivalents"         }
        if(name == "TotalCashAndCashEquivalents") {           return "Total Cash And Cash Equivalents"         }
        if(name == "ProfitBeforeExtraordinaryItemsAndTax") {             return "PBT before Extraordinary Item"
        }

    if(name == "OtherAdjustmentsForWhichCashEffectsAreInvestingOrFinancingCashFlow") {             return "Other Adjustments For Investing Or Financing Items"
    }
    if(name == "CashFlowsFromLosingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities") {             return "Cash Flows From Losing Control of Subsidiaries"
    }
    if(name == "CashReceiptsFromRepaymentOfAdvancesAndLoansMadeToOtherPartiesClassifiedAsInvestingActivities") {             return "Receipt from Repayment Of Advances And Loans"
    }
    if(name == "CashPaymentsForFutureContractsForwardContractsOptionContractsAndSwapContractsClassifiedAsInvestingActivities") {             return "Cash Payments For Future/Options Contracts"
    }
    if(name == "CashReceiptsFromFutureContractsForwardContractsOptionContractsAndSwapContractsClassifiedAsInvestingActivities") {             return "Cash Receipts From Future/Options Contracts"
    }
    if(name == "IncomeTaxesPaidRefundClassifiedAsInvestingActivities") {             return "Taxes Paid/Classified As Investing Activities" }
    if(name == "AdjustmentsForDecreaseIncreaseInInventories") {             return "Adjustments For Decrease/Increase In Inventories "         }
    if(name == "TotalAdjustmentsForReconcileProfitLoss") {             return "Total Adjustments For Reconcile Profit/Loss "         }
    if(name == "DividendsReceivedClassifiedAsInvestingActivities") {             return "Dividends Received/Classified As Investing Activities"         }
    if(name == "InterestReceivedClassifiedAsInvestingActivities") {             return "Interest Received/Classified As Investing Activities"         }

    if(name=="CashFlowsUsedInObtainingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities"){return "Cash Flows Used In Obtaining Control of Subsidiaries"}
    }



//likewise go on for every name and it's alias
        return alias
    }


    // console.log('hihihihi'+companydetail)

    // tab 

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `full-width-tab-${index}`,
          "aria-controls": `full-width-tabpanel-${index}`,
        };
      }

       const [changeIncrores,setchangeIncrores] = React.useState(true);

       const changeamountDigit = () =>{

        setchangeIncrores(!changeIncrores)
        changeIncrores ? setcurrency(100000) : setcurrency(10000000)
       }
        
    const useStyles = makeStyles((theme) => ({
        root: {
          backgroundColor: theme.palette.background.paper,
          width: "100%",
        },
      }));

    // const [companyId, setCompanyId] = React.useState(props.companyId);

  const classes = useStyles();
  const theme = useTheme();
//   let history = useHistory();
  const [value, setValue] = React.useState(0);
  const [details, setDetails] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  React.useEffect(() => {
    // getProfile();
  }, []);

  // async function getProfile() {
  //   const response = await apiCall("useronboarding/accountonboarding", "GET", history);
  //   let responseJSON = await response.json();
  //   setDetails(responseJSON);
  // }
    function isNum(val){
        return !isNaN(val)
    }

    function modification(data) {

        if (!isNum(data) || data == undefined || data == "0"|| data == "0.0"|| data == "0.00"|| data == "") {
            return "-"
        }

        let a = parseFloat(data/currency).toFixed(2)
        if (!isNum(a) || a == undefined || a == "0"|| a == "0.0"|| a == "0.00"|| data == "") {
            return "-"
        }

        return a
    }

    function modification1(data) {

        if (!isNum(data) || data == undefined || data == "0"|| data == "0.0"|| data == "0.00"|| data == "") {
            return "-"
        }

        return data
    }

    const [toggle,setToggle] = React.useState(false);

    const toggleState = () => {

        toggle ? setcurrency(10000000) : setcurrency(100000)
        setToggle(!toggle);
    }

    return(
        <>

<div className="trade-tabs-right company-details-tabs">
      <div className={classes.root}>
        <AppBar position="static"color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="#2E384D"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Profit & Loss Statement"{...a11yProps(0) }  />
            <Tab label="Balance Sheet"{...a11yProps(1)} />
            <Tab label="Ratio Analysis"{...a11yProps(2)} />
            <Tab label="Cash Flow Statements"{...a11yProps(3)} />
            {/* <Tab label="Recent News"{...a11yProps(4)} /> */}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl"? "x-reverse": "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {/* <About companyId={companyId} /> */}           
            <div className="row">
            {/* <div className="col-md-12 col-12">
                <div className="tab-desc">
                    <h6 className="text-primary-default">Profit & Loss Statement</h6>
                </div>
            </div>             */}
            <div className="col-md-12 col-12 p-0">
                <div className="financials-table-section mt-2">
                    <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-primary-default">Profit & Loss Statement</h6> 
                        <div className="switch-field d-flex ">
                            <span className={toggle ? "switch-lable2 left-lable-shap":"switch-lable left-lable-shap"}>
                                <input type="radio" id="switch_left" name="switchToggle" value="In Crorres" onChange={toggleState} checked={!toggle} />
                                <label htmlFor="switch_left">In Crores</label>
                            </span>
                            <span className={toggle ? "switch-lable Right-lable-shap":"switch-lable2 Right-lable-shap"}>
                                <input type="radio" id="switch_right" name="switchToggle" value="In Lakh" onChange={toggleState} checked={toggle} />
                                <label htmlFor="switch_right" >In Lakh</label>
                            </span>
                        </div>
                    </div>
                    <table className="w-100">
                        <tr>
                            <th>All items in INR <br/> unless specified</th>
                            {/*<th>FY16</th>*/}
                            <th>FY17</th>
                            <th>FY18</th>
                            <th>FY19</th>
                            <th>FY20</th>
                            <th>FY21</th>
                        </tr>

                            {
                                financialsStatementOfProfitAndLoss.map(
                                    (financialsStatementOfProfitAndLss,index) => (
                                        (bold.indexOf(financialsStatementOfProfitAndLss.name) != -1) ?

                                        <tr>
                                            <td><b> { nameAlias(financialsStatementOfProfitAndLss.name)} </b></td>
                                            {/*<td>{modification(financialsStatementOfProfitAndLss.fy_2016)} </td>*/}
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2017)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2018)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2019)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2020)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2021)} </td>

                                        </tr> :
                                            <tr>
                                                <td>{ nameAlias(financialsStatementOfProfitAndLss.name)}</td>
                                                {/*<td>{modification(financialsStatementOfProfitAndLss.fy_2016)} </td>*/}
                                                <td>{modification(financialsStatementOfProfitAndLss.fy_2017)} </td>
                                                <td>{modification(financialsStatementOfProfitAndLss.fy_2018)} </td>
                                                <td>{modification(financialsStatementOfProfitAndLss.fy_2019)} </td>
                                                <td>{modification(financialsStatementOfProfitAndLss.fy_2020)} </td>
                                                <td>{modification(financialsStatementOfProfitAndLss.fy_2021)} </td>
                                            </tr>
                                    ))
                            }

                    </table>
                </div>
               <hr className="mt-5"/>
            </div> 

            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {/* <Ownership companyId={companyId}  />  */}
            <div className="row">
            <div className="col-md-12 col-12">
                <div className="financials-table-section mt-2">
                    {/* <h6 className="text-primary-default">Balance Sheet</h6> */}
                    <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-primary-default">Balance Sheet</h6>
                        <div className="switch-field d-flex ">
                            <span className="switch-lable">
                                <input type="radio"id="switch_left"name="switchToggle"value="In Crorres"onChange={toggleState} checked={!toggle}/>
                                <label htmlFor="switch_left">In Crores</label>
                            </span>
                            <span className="switch-lable2">
                                <input type="radio"id="switch_right"name="switchToggle"value="In Lakh"onChange={toggleState} checked={toggle}/>
                                <label htmlFor="switch_right">In Lakh</label>
                            </span>
                        </div>
                    </div>
                    <table className="w-100">
                        <tr>
                            <th>All items in INR <br/> unless specified</th>
                            {/*<th>FY16</th>*/}
                            <th>FY17</th>
                            <th>FY18</th>
                            <th>FY19</th>
                            <th>FY20</th>
                            <th>FY21</th>
                        </tr>

                        {
                            financialsBalanceSheet.map(                                    (financialsStatementOfProfitAndLss,index) => (
                                (bold.indexOf(financialsStatementOfProfitAndLss.name) != -1) ?

                                    <tr>
                                        <td><b> { nameAlias(financialsStatementOfProfitAndLss.name)} </b></td>
                                        {/*<td>{modification(financialsStatementOfProfitAndLss.fy_2016)} </td>*/}
                                        <td>{modification(financialsStatementOfProfitAndLss.fy_2017)} </td>
                                        <td>{modification(financialsStatementOfProfitAndLss.fy_2018)} </td>
                                        <td>{modification(financialsStatementOfProfitAndLss.fy_2019)} </td>
                                        <td>{modification(financialsStatementOfProfitAndLss.fy_2020)} </td>
                                        <td>{modification(financialsStatementOfProfitAndLss.fy_2021)} </td>

                                    </tr> :
                                    <tr>
                                        <td>{ nameAlias(financialsStatementOfProfitAndLss.name)}</td>
                                        {/*<td>{modification(financialsStatementOfProfitAndLss.fy_2016)} </td>*/}
                                        <td>{modification(financialsStatementOfProfitAndLss.fy_2017)} </td>
                                        <td>{modification(financialsStatementOfProfitAndLss.fy_2018)} </td>
                                        <td>{modification(financialsStatementOfProfitAndLss.fy_2019)} </td>
                                        <td>{modification(financialsStatementOfProfitAndLss.fy_2020)} </td>
                                        <td>{modification(financialsStatementOfProfitAndLss.fy_2021)} </td>
                                    </tr>
                            ))
                        }
                    </table>
                </div>
                <hr className="mt-5"/>
            </div> 
            </div>

          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {/* <Financials companyId={companyId}  /> */}
            <div className="row">
            <div className="col-md-12 col-12">
                <div className="financials-table-section mt-2">
                    <h6 className="text-primary-default">Ratio Analysis</h6>
                    <table className="w-100">
                        <tr>
                            <th>All items in INR <br/> or Ratio unless specified</th>
                            {/*<th>FY16</th>*/}
                            <th>FY17</th>
                            <th>FY18</th>
                            <th>FY19</th>
                            <th>FY20</th>
                            <th>FY21</th>
                        </tr>

                        {
                            financialsRatioAnalysis.map(
                                (financialsStatementOfProfitAndLss,index) => (
                                    (bold.indexOf(financialsStatementOfProfitAndLss.name) != -1) ?

                                        <tr>
                                            <td><b> { nameAlias(financialsStatementOfProfitAndLss.name)} </b></td>
                                            {/*<td>{modification1(financialsStatementOfProfitAndLss.fy_2016)} </td>*/}
                                            <td>{modification1(financialsStatementOfProfitAndLss.fy_2017)} </td>
                                            <td>{modification1(financialsStatementOfProfitAndLss.fy_2018)} </td>
                                            <td>{modification1(financialsStatementOfProfitAndLss.fy_2019)} </td>
                                            <td>{modification1(financialsStatementOfProfitAndLss.fy_2020)} </td>
                                            <td>{modification1(financialsStatementOfProfitAndLss.fy_2021)} </td>

                                        </tr> :
                                        <tr>
                                            <td>{ nameAlias(financialsStatementOfProfitAndLss.name)}</td>
                                            {/*<td>{modification1(financialsStatementOfProfitAndLss.fy_2016)} </td>*/}
                                            <td>{modification1(financialsStatementOfProfitAndLss.fy_2017)} </td>
                                            <td>{modification1(financialsStatementOfProfitAndLss.fy_2018)} </td>
                                            <td>{modification1(financialsStatementOfProfitAndLss.fy_2019)} </td>
                                            <td>{modification1(financialsStatementOfProfitAndLss.fy_2020)} </td>
                                            <td>{modification1(financialsStatementOfProfitAndLss.fy_2021)} </td>
                                        </tr>
                                )
                            )
                        }
                    </table>
                </div>
                <hr className="mt-5"/>
            </div>
            </div>

          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            {/* <SummaryRisks companyId={companyId}  /> */}
            <div className="row">
            <div className="col-md-12 col-12">
                <div className="financials-table-section mt-2">
                    {/* <h6 className="text-primary-default">Cash Flow statement</h6> */}
                    <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-primary-default">Cash Flow statement</h6>
                        <div className="switch-field d-flex ">
                            <span className="switch-lable">
                                <input type="radio"id="switch_left"name="switchToggle"value="In Crorres"onChange={toggleState} checked={!toggle}/>
                                <label htmlFor="switch_left">In Crores</label>
                            </span>
                            <span className="switch-lable2">
                                <input type="radio"id="switch_right"name="switchToggle"value="In Lakh"onChange={toggleState} checked={toggle}/>
                                <label htmlFor="switch_right">In Lakh</label>
                            </span>
                        </div>
                    </div>
                    <table className="w-100">
                        <tr>
                            <th>All items in INR <br/> unless specified</th>
                            {/*<th>FY16</th>*/}
                            <th>FY17</th>
                            <th>FY18</th>
                            <th>FY19</th>
                            <th>FY20</th>
                            <th>FY21</th>
                        </tr>

                        {

                            financialsCashFlowStatement.map(
                                (financialsStatementOfProfitAndLss,index) => (
                                    (bold.indexOf(financialsStatementOfProfitAndLss.name) != -1) ?

                                        <tr>
                                            <td><b> { nameAlias(financialsStatementOfProfitAndLss.name)} </b></td>
                                            {/*<td>{modification(financialsStatementOfProfitAndLss.fy_2016)} </td>*/}
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2017)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2018)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2019)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2020)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2021)} </td>

                                        </tr> :
                                        <tr>
                                            <td>{ nameAlias(financialsStatementOfProfitAndLss.name)}</td>
                                            {/*<td>{modification(financialsStatementOfProfitAndLss.fy_2016)} </td>*/}
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2017)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2018)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2019)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2020)} </td>
                                            <td>{modification(financialsStatementOfProfitAndLss.fy_2021)} </td>
                                        </tr>
                                )
                                )
                        }
                    </table>
                    
                </div>
            </div>
            </div>

          </TabPanel>
          {/* <TabPanel value={value} index={4} dir={theme.direction}>
            <RecentNews companyId={companyId}  />
            <h1>tab5</h1>

          </TabPanel> */}
        
        </SwipeableViews>
      </div>
    </div>



    </>
    )
}
export default Financials