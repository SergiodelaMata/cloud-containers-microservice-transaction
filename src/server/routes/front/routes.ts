import {TransactionController, GetTransactions, GetTransaction} from "../../../controllers/transaction.controller"
import express, { Router, Request, Response} from "express";

const router: Router = express.Router();

router.get("/transactions", async(_req: Request, res: Response) =>{
  const transactionData: GetTransactions = await TransactionController.getTransactions(_req);
  res.header("X-version","2");
  res.header("X-sender","transaction");
  res.header("X-destination","enrouting");
  res.send(transactionData);
})

router.get("/transactions/:transactionId", async(_req: Request, res: Response) =>{
  const transactionData: GetTransaction = await TransactionController.getTransaction(_req);
  res.header("X-version","2");
  res.header("X-sender","transaction");
  res.header("X-destination","enrouting");
  res.send(transactionData);
})

router.get("/transactions/user/:userId", async(_req: Request, res: Response) =>{
  const transactionData: GetTransactions = await TransactionController.getTransactionsUser(_req);
  res.header("X-version","2");
  res.header("X-sender","transaction");
  res.header("X-destination","enrouting");
  res.send(transactionData);
})


router.post("/transaction", async(_req: Request, res: Response) => {
  const verify = await TransactionController.saveTransaction(_req);
  res.header("X-version","2");
  res.header("X-sender","transaction");
  res.header("X-destination","enrouting");
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
  res.header("X-version","2");
  res.header("X-sender","transaction");
  res.header("X-destination","enrouting");
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
  res.header("X-version","2");
  res.header("X-sender","transaction");
  res.header("X-destination","enrouting");
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
