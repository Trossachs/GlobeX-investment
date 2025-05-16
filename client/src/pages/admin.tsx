import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/auth-context';
import { useLocation } from 'wouter';
import { Edit, Trash2, Plus, Users, Coins, BarChart3, Clock } from 'lucide-react';

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('users');
  
  // Redirect if not admin
  React.useEffect(() => {
    if (!authLoading && (!user || (user && !user.isAdmin))) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to view this page.',
        variant: 'destructive',
      });
      navigate('/login');
    }
  }, [user, authLoading, navigate, toast]);

  if (authLoading || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="page-transition pt-14 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">
              Manage users, assets, and transactions
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate('/')}>
              Return to Site
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="assets" className="flex items-center space-x-2">
              <Coins className="h-4 w-4" />
              <span>Assets</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Statistics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="assets">
            <AssetManagement />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionManagement />
          </TabsContent>

          <TabsContent value="stats">
            <SiteStatistics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function UserManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['/api/admin/users'],
    staleTime: 60000,
  });

  const createUserMutation = useMutation({
    mutationFn: (userData: any) => {
      return apiRequest('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({ title: 'Success', description: 'User created successfully' });
      setDialogOpen(false);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to create user', 
        variant: 'destructive' 
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (userData: any) => {
      return apiRequest(`/api/admin/users/${userData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(userData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({ title: 'Success', description: 'User updated successfully' });
      setDialogOpen(false);
      setEditUser(null);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to update user', 
        variant: 'destructive' 
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => {
      return apiRequest(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      toast({ title: 'Success', description: 'User deleted successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to delete user', 
        variant: 'destructive' 
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const userData = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      fullName: formData.get('fullName') as string,
      isAdmin: formData.get('isAdmin') === 'on',
    };

    if (editUser) {
      updateUserMutation.mutate({ id: editUser.id, ...userData });
    } else {
      createUserMutation.mutate(userData);
    }
  };

  const handleEdit = (user: any) => {
    setEditUser(user);
    setDialogOpen(true);
  };

  const handleDelete = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUserMutation.mutate(userId);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
    </div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Management</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => setEditUser(null)} 
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add User</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editUser ? 'Edit User' : 'Add New User'}</DialogTitle>
              <DialogDescription>
                {editUser ? 'Update user details below.' : 'Fill in the details to create a new user.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    name="username" 
                    defaultValue={editUser?.username || ''} 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    defaultValue={editUser?.email || ''} 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password {editUser && '(leave blank to keep current)'}</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required={!editUser} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    defaultValue={editUser?.fullName || ''} 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isAdmin" 
                    name="isAdmin" 
                    defaultChecked={editUser?.isAdmin || false} 
                  />
                  <Label htmlFor="isAdmin">Admin Privileges</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editUser ? 'Update User' : 'Create User'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>List of all users in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName || '-'}</TableCell>
                  <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500" 
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function AssetManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editAsset, setEditAsset] = useState<any>(null);
  
  const { data: assets, isLoading } = useQuery({
    queryKey: ['/api/admin/assets'],
    staleTime: 60000,
  });

  const createAssetMutation = useMutation({
    mutationFn: (assetData: any) => {
      return apiRequest('/api/admin/assets', {
        method: 'POST',
        body: JSON.stringify(assetData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/assets'] });
      toast({ title: 'Success', description: 'Asset created successfully' });
      setDialogOpen(false);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to create asset', 
        variant: 'destructive' 
      });
    },
  });

  const updateAssetMutation = useMutation({
    mutationFn: (assetData: any) => {
      return apiRequest(`/api/admin/assets/${assetData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(assetData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/assets'] });
      toast({ title: 'Success', description: 'Asset updated successfully' });
      setDialogOpen(false);
      setEditAsset(null);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to update asset', 
        variant: 'destructive' 
      });
    },
  });

  const deleteAssetMutation = useMutation({
    mutationFn: (assetId: number) => {
      return apiRequest(`/api/admin/assets/${assetId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/assets'] });
      toast({ title: 'Success', description: 'Asset deleted successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to delete asset', 
        variant: 'destructive' 
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const assetData = {
      symbol: formData.get('symbol') as string,
      name: formData.get('name') as string,
      price: formData.get('price') as string,
      percentChange: formData.get('percentChange') as string,
      marketCap: formData.get('marketCap') as string || "0",
    };

    if (editAsset) {
      updateAssetMutation.mutate({ id: editAsset.id, ...assetData });
    } else {
      createAssetMutation.mutate(assetData);
    }
  };

  const handleEdit = (asset: any) => {
    setEditAsset(asset);
    setDialogOpen(true);
  };

  const handleDelete = (assetId: number) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      deleteAssetMutation.mutate(assetId);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
    </div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Asset Management</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => setEditAsset(null)} 
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Asset</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editAsset ? 'Edit Asset' : 'Add New Asset'}</DialogTitle>
              <DialogDescription>
                {editAsset ? 'Update asset details below.' : 'Fill in the details to create a new asset.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input 
                    id="symbol" 
                    name="symbol" 
                    defaultValue={editAsset?.symbol || ''} 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    defaultValue={editAsset?.name || ''} 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number" 
                    step="0.00000001"
                    defaultValue={editAsset?.price || ''} 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="percentChange">Percent Change (%)</Label>
                  <Input 
                    id="percentChange" 
                    name="percentChange" 
                    type="number" 
                    step="0.01"
                    defaultValue={editAsset?.percentChange || ''} 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="marketCap">Market Cap (optional)</Label>
                  <Input 
                    id="marketCap" 
                    name="marketCap" 
                    type="number"
                    defaultValue={editAsset?.marketCap || ''} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editAsset ? 'Update Asset' : 'Create Asset'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>List of all trading assets</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Change (%)</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets && assets.length > 0 ? (
              assets.map((asset: any) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.id}</TableCell>
                  <TableCell>{asset.symbol}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>${parseFloat(asset.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</TableCell>
                  <TableCell className={parseFloat(asset.percentChange) >= 0 ? "text-green-500" : "text-red-500"}>
                    {parseFloat(asset.percentChange) >= 0 ? '+' : ''}{asset.percentChange}%
                  </TableCell>
                  <TableCell>
                    {asset.marketCap ? `$${parseFloat(asset.marketCap).toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(asset)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500" 
                        onClick={() => handleDelete(asset.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No assets found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TransactionManagement() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['/api/admin/transactions'],
    staleTime: 60000,
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
    </div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>All system transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions && transactions.length > 0 ? (
              transactions.map((tx: any) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.id}</TableCell>
                  <TableCell>{tx.userId}</TableCell>
                  <TableCell>{tx.assetId}</TableCell>
                  <TableCell className={tx.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                    {tx.type.toUpperCase()}
                  </TableCell>
                  <TableCell>{parseFloat(tx.amount).toLocaleString()}</TableCell>
                  <TableCell>${parseFloat(tx.price).toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tx.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : tx.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SiteStatistics() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/admin/stats'],
    staleTime: 60000,
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>User Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Total Users</span>
              <span className="font-bold text-xl">{stats?.userCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Admin Users</span>
              <span className="font-bold text-xl">{stats?.adminCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">New Users (Last 7 days)</span>
              <span className="font-bold text-xl">{stats?.newUserCount || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Total Transactions</span>
              <span className="font-bold text-xl">{stats?.transactionCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Buy Transactions</span>
              <span className="font-bold text-xl text-green-500">{stats?.buyCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Sell Transactions</span>
              <span className="font-bold text-xl text-red-500">{stats?.sellCount || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Asset Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Total Assets</span>
              <span className="font-bold text-xl">{stats?.assetCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Total Market Cap</span>
              <span className="font-bold text-xl">
                ${parseInt(stats?.totalMarketCap || "0").toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Most Traded Asset</span>
              <span className="font-bold text-xl">{stats?.mostTradedAsset || "-"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}