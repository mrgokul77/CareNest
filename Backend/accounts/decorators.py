from django.shortcuts import redirect

def admin_only(function):
    def run(request, *args, **kwargs):
        if request.user.is_staff:
            return function(request, *args, **kwargs)
        else:
            return redirect('/')
    return run