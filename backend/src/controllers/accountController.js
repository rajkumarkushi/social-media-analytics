import { addAccountService, getAccountsService, deleteAccountService } from "../services/accountService.js";

export const addAccount = async (req, res) => {
  try {
    const account = await addAccountService(req.user.id, req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const accounts = await getAccountsService(req.user.id);
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    await deleteAccountService(req.user.id, req.params.id);
    res.json({ message: "Account removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
