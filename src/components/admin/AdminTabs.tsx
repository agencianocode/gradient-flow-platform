
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminUsersTab } from "./tabs/AdminUsersTab"
import { AdminCoursesTab } from "./tabs/AdminCoursesTab"
import { AdminEventsTab } from "./tabs/AdminEventsTab"
import { AdminCommunityTab } from "./tabs/AdminCommunityTab"
import { AdminCategoriesTab } from "./tabs/AdminCategoriesTab"
import { AdminSettingsTab } from "./tabs/AdminSettingsTab"

export function AdminTabs() {
  return (
    <Tabs defaultValue="users" className="space-y-6">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="users">Usuarios</TabsTrigger>
        <TabsTrigger value="courses">Cursos</TabsTrigger>
        <TabsTrigger value="events">Eventos</TabsTrigger>
        <TabsTrigger value="community">Comunidad</TabsTrigger>
        <TabsTrigger value="categories">Categorías</TabsTrigger>
        <TabsTrigger value="settings">Configuración</TabsTrigger>
      </TabsList>

      <TabsContent value="users">
        <AdminUsersTab />
      </TabsContent>

      <TabsContent value="courses">
        <AdminCoursesTab />
      </TabsContent>

      <TabsContent value="events">
        <AdminEventsTab />
      </TabsContent>

      <TabsContent value="community">
        <AdminCommunityTab />
      </TabsContent>

      <TabsContent value="categories">
        <AdminCategoriesTab />
      </TabsContent>

      <TabsContent value="settings">
        <AdminSettingsTab />
      </TabsContent>
    </Tabs>
  )
}
