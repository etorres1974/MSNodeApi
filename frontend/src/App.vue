<template>
  <v-app id="app">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon >mdi-square</v-icon>

      <v-icon  >mdi-circle</v-icon> 

    </v-system-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        v-if="isLogged"
        color="grey lighten-4"
        class="pa-4"
      >
        <v-icon v-if="isDoctor"> mdi-doctor</v-icon>
        <v-icon v-if="isClient"> mdi-account-injury</v-icon>
        <div>{{user.name}}</div>
        <div>{{user.email}}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, link] in links"
          :key="icon"
          link
          :to="link"
        >
          <v-list-item-icon  >
            <v-icon>  {{icon}} </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      > 
    
        <router-view />
        
        <vtoast ref="vtoast" />
      </v-container>

    </v-main>
  </v-app>
  
</template>

<script>
import EventBus from "./services/event-bus"
import vtoast from "./components/vtoast.vue"
import cache from "./services/cache"
  export default {
    components :{ 
      vtoast
    },
    mounted(){
      EventBus.$on('success-toast', payload => {
        console.log("EVENT BUS SUCCESS", payload)
        this.$refs.vtoast.success({message: payload})
      })
      EventBus.$on('error-toast', payload => {
        this.$refs.vtoast.error({message: payload})
      })
      EventBus.$on('user-login', payload => {
        console.log("USER LOGIN", payload)
        cache.setUser(payload)
        if(this.$route.path != "/agenda")
          this.$router.push("/agenda")
        this.updated++
      })
      EventBus.$on('user-logout', payload => {
        console.log("USER LOGOUT", this.$route.path)
        cache.clearUser()
        if(this.$route.path != "/account")
          this.$router.push("/account")
        this.updated++
      })
    },
    methods: {
    },
    computed : {
      isLogged(){
        this.updated
        return cache.getUser() != null

      },
      links(){
        this.updated
        if(this.isLogged)
          return this.public_links.concat(this.private_links)
        else
          return this.public_links 
      },
      user(){
        return cache.getUser() 
      },
      isClient(){
        return cache.isUserClient()
      },
      isDoctor(){
        return cache.isUserDoctor()
      }
    },
    data: () => ({
      updated : 0,
      drawer: null,
      public_links: [
        ['mdi-account', 'Account', "/account"],
      ],
      private_links: [
        ['mdi-view-agenda', 'Agenda', "/agenda"]
      ],
    })
  }
</script>