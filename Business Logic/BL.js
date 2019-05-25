function BL(){
    //Global variable for sales view model
    let _viewModel= undefined;
    
    //Creating required features of our model
    //First feature, get total product quantity price 
    let getTotalQuantityPrice=function(){

        try{
            //creating local variables to store values 
            let $totalQuantityPrice=undefined;
            let $productPrice=undefined;
            let $productQuantity=undefined;

            //fetching values from their respective models into our local variables
            $productPrice=
            _viewModel.
            productModel.
            price;

            $productQuantity=
            _viewModel.
            productCalculation.
            quantity;
        
            //calculating total quantity price
            $totalQuantityPrice= $productPrice * $productQuantity;
            //binding total quantity price to view model
            _viewModel.
            productCalculation.
            totalQuantityPrice=$totalQuantityPrice;
        }
        catch(ex){
            throw ex;
        }
    }
    
    //Second feature, get Discount price based on customer type 
    let getDiscountPrice=function(){
        //creating local variables
        let $customerType=undefined;
        let $totalQuantityPrice=undefined;
        let $productDiscountObj=undefined;
    
        try{
            $customerType=
            _viewModel.
            customerModel.
            type;

            $totalQuantityPrice=
            _viewModel.
            productCalculation.
            totalQuantityPrice;
            //creating an instance of productDiscount class
            $productDiscountObj=new productDiscount();

            //checking the customer type and providing discount accordingly 
            if($customerType==="Silver"){
                $productDiscountObj.discountRate=10;
                $productDiscountObj=$totalQuantityPrice*(10/100);
            }
            else if($customerType==="Gold"){
                $productDiscountObj.discountRate=20;
                $productDiscountObj=$totalQuantityPrice*(20/100);
            }
            else if($customerType==="Platinum"){
                $productDiscountObj.discountRate=30;
                $productDiscountObj=$totalQuantityPrice*(30/100);
            }

            //binding productDiscountobj to view model
            _viewModel.
            productDiscount.
            discountPrice=$productDiscountObj;
        }
        catch(ex){
            throw ex;
        }
    }

    //Creating 3rd feature, gross price
    let getGrossPrice=function(){
        try{
            let $discountPrice=undefined;
            let $totalQuantityPrice=undefined;
            let $grossPrice=undefined;

            $discountPrice=
            _viewModel.
            productDiscount.
            discountPrice;

            $totalQuantityPrice=
            _viewModel.
            productCalculation.
            totalQuantityPrice;

            $grossPrice= $totalQuantityPrice - $discountPrice;

            _viewModel.
            productDiscount.
            grossPrice= $grossPrice;

        }
        catch(ex){
            throw ex;
        }
    }

    //creating 4th feature, apply gst on gross price

    let getGst=function(){

        try{
            let $grossPrice=undefined;
            let $gst18=undefined;
            let $csgt9=undefined;
            let $sgst9=undefined;
            let $productTaxObj=undefined;

            $grossPrice=
            _viewModel.
            productCalculation.
            grossPrice;

            $gst18=$grossPrice * (18/100);

            //calcuate cgst
            $csgt9=$gst18/2;

            //calculate sgst
            $sgst9=$gst18/2;

            //creating instance of tax model

            $productTaxObj=new productTax();
            $productTaxObj.cgst=$csgt9;
            $productTaxObj.sgst=$sgst9;
            
            //binding cgst and sgst to view model
            _viewModel.
            productTax=$productTaxObj;


        }
        catch(ex){
            throw ex;
        }
    }
    
    //creating 5th feature, net price
    
    let getNetPrice=function(){
        try{
            let $netPrice=undefined;
            let $grossPrice=undefined;
            let $csgt9=undefined;
            let $sgst9=undefined;

            $grossPrice=
            _viewModel.
            productCalculation.
            grossPrice;

            $csgt9=
            _viewModel.
            productTax.
            cgst;

            $sgst9=
            _viewModel.
            productTax.
            sgst;

            $netPrice= $grossPrice + ($csgt9+$sgst9);

            _viewModel.
            productCalculation.
            netPrice=$netPrice;
        }
        catch(ex){
            throw ex;
        }

    }
    //Function to set values in view model
    this.setDetails=function(viewModel){ 

    try{
        _viewModel=viewModel;
    }
    catch(ex){
        throw ex;
    }
    //Function to get values from view model
    this.getDetails=function(){
        try
        {
            getTotalQuantityPrice();

            getDiscountPrice();

            getGrossPrice();

            getGst();

            getNetPrice();

            return _viewModel;
        }
        catch(ex){
            throw ex;
        }
    }

    }
}