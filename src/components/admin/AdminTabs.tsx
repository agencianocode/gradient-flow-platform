
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminUsersTab } from "./tabs/AdminUsersTab"
import { AdminCoursesTab } from "./tabs/AdminCoursesTab"
import { AdminCategoriesTab } from "./tabs/AdminCategoriesTab"
import { AdminCommunityTab } from "./tabs/AdminCommunityTab"
import { AdminEventsTab } from "./tabs/AdminEventsTab"
import { AdminSettingsTab } from "./tabs/AdminSettingsTab"
import { AdminImportTab } from "./tabs/AdminImportTab"

export function AdminTabs() {
  return (
    <Tabs defaultValue="users" className="space-y-4">
      <TabsList className="grid w-full grid-cols-7">
        <TabsTrigger value="users">Usuarios</TabsTrigger>
        <TabsTrigger value="courses">Cursos</TabsTrigger>
        <TabsTrigger value="categories">Categorías</TabsTrigger>
        <TabsTrigger value="community">Comunidad</TabsTrigger>
        <TabsTrigger value="events">Eventos</TabsTrigger>
        <TabsTrigger value="import">Importar</TabsTrigger>
        <TabsTrigger value="settings">Configuración</TabsTrigger>
      </TabsList>
      
      <TabsContent value="users">
        <AdminUsersTab />
      </TabsContent>
      
      <TabsContent value="courses">
        <AdminCoursesTab />
      </TabsContent>
      
      <TabsContent value="categories">
        <AdminCategoriesTab />
      </TabsContent>
      
      <TabsContent value="community">
        <AdminCommunityTab />
      </TabsContent>
      
      <TabsContent value="events">
        <AdminEventsTab />
      </TabsContent>
      
      <TabsContent value="import">
        <AdminImportTab />
      </TabsContent>
      
      <TabsContent value="settings">
        <AdminSettingsTab />
      </TabsContent>
    </Tabs>
  )
}
