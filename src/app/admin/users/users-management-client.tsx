
"use client";

import { useState, useEffect, useTransition } from 'react';
import { getUsers, updateUserRole, deleteUser, type ManagedUser, type UserRole } from './actions';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '@/hooks/use-auth';
import { Card } from '@/components/ui/card';

export default function UsersManagementClient() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [userToDelete, setUserToDelete] = useState<ManagedUser | null>(null);
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = () => {
    setIsLoading(true);
    getUsers().then(data => {
      setUsers(data);
      setIsLoading(false);
    });
  }

  const handleRoleChange = (uid: string, role: UserRole) => {
    startTransition(async () => {
      const result = await updateUserRole(uid, role);
      if (result.success) {
        setUsers(prev => prev.map(u => u.uid === uid ? { ...u, role } : u));
      }
      toast({
        title: result.success ? 'Success' : 'Error',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      });
    });
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    startTransition(async () => {
        const result = await deleteUser(userToDelete.uid);
        if (result.success) {
            setUsers(prev => prev.filter(u => u.uid !== userToDelete.uid));
        }
        toast({
            title: result.success ? 'Success' : 'Error',
            description: result.message,
            variant: result.success ? 'default' : 'destructive',
        });
        setUserToDelete(null);
    });
  };

  const renderSkeleton = () => (
    <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
    </div>
  );

  if (isLoading) {
      return (
        <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6">
            {renderSkeleton()}
        </Card>
      );
  }

  return (
    <AlertDialog>
        <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {users.map(user => (
                        <TableRow key={user.uid}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={user.photoURL ?? ''} alt={user.displayName} />
                                    <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{user.displayName}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                            <Select
                            value={user.role}
                            onValueChange={(value: UserRole) => handleRoleChange(user.uid, value)}
                            disabled={isPending || user.uid === currentUser?.uid}
                            >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="developer">Developer</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell className="text-right">
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={isPending || user.uid === currentUser?.uid}
                                    onClick={() => setUserToDelete(user)}
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </AlertDialogTrigger>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </Card>

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the user's data from your database.
                    The user will still exist in Firebase Authentication.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setUserToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteUser} disabled={isPending}>
                    {isPending ? 'Deleting...' : 'Continue'}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
}
