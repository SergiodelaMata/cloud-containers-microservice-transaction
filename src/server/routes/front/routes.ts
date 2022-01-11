import {TransactionController, GetTransactions, GetTransaction} from "../../../controllers/transaction.controller"
import express, { Router, Request, Response} from "express";

const router: Router = express.Router();

router.get("/transactions", async(_req: Request, res: Response) =>{
  const transactionData: GetTransactions = await TransactionController.getTransactions(_req);
  res.send(transactionData);
})

router.get("/transactions/:transactionId", async(_req: Request, res: Response) =>{
  const userData: GetTransaction = await TransactionController.getTransaction(_req);
  res.send(userData);
})

router.post("/transaction", async(_req: Request, res: Response) => {
  const verify = await TransactionController.saveTransaction(_req);
  if(verify)
  {
    res.status(200).send({status:"Saved"});
  }
  else
  {
    res.status(200).send({status:"Transaction already saved"});
  }
});

router.put("/transaction/update", async(_req: Request, res: Response) => {
  const verify = await TransactionController.updateTransaction(_req);
  if(verify)
  {
    res.status(200).send({status:"Updated"});
  }
  else
  {
    res.status(200).send({status:"Transaction couldn't be updated"});
  }
});


router.delete("/admin/transaction/:transactionId", async(_req: Request, res: Response) => {
  const verify = await TransactionController.deleteTransaction(_req);
  if(verify)
  {
    res.status(200).send({status:"Deleted"});
  }
  else
  {
    res.status(200).send({status:"No Transaction to be deleted"});
  }
});

export default router;
